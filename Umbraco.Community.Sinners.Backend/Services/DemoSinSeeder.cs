using System.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Community.Sinners.Backend.Configuration;

namespace Umbraco.Community.Sinners.Backend.Services;

/// <summary>
/// Stage rig: plants the sins of commandment VIII on a fresh site, so a reset always has something to lead out
/// of Egypt. Runs once at boot, in the background, when <see cref="SinnersSettings.SeedSins"/> is on, the
/// environment is Development and the "Form submissions" node doesn't exist yet (an Exodus empties it but
/// leaves it standing, so it doesn't re-seed after the demo).
/// <list type="bullet">
/// <item>"Form submissions" (a root collection, <see cref="FormSubmissionsKey"/>) with threshold + 100 submissions</item>
/// <item>"Visitor counter" inside it, published threshold + 20 times</item>
/// </list>
/// Commandment VII's sin (a nav partial that walks the tree) is a file, so reset.ps1 writes that one.
/// </summary>
public class DemoSinSeeder(
    IOptionsMonitor<SinnersSettings> settings,
    IWebHostEnvironment env,
    IRuntimeState runtimeState,
    ICoreScopeProvider coreScopeProvider,
    IContentService contentService,
    IContentTypeService contentTypeService,
    IContentTypeContainerService containerService,
    IDataTypeService dataTypeService,
    IShortStringHelper shortStringHelper,
    ILogger<DemoSinSeeder> logger) : INotificationAsyncHandler<UmbracoApplicationStartedNotification>
{
    public static readonly Guid FormSubmissionsKey = new("0d1e5e08-8a2e-4f0e-9d7b-5f0a5b5e0008");
    public static readonly Guid VisitorCounterKey = new("0d1e5e08-8a2e-4f0e-9d7b-5f0a5b5e0100");

    private static int _started;

    public Task HandleAsync(UmbracoApplicationStartedNotification notification, CancellationToken cancellationToken)
    {
        if (!settings.CurrentValue.SeedSins || !env.IsDevelopment() || runtimeState.Level != RuntimeLevel.Run)
            return Task.CompletedTask;
        if (contentService.GetById(FormSubmissionsKey) is not null)
            return Task.CompletedTask;
        if (Interlocked.Exchange(ref _started, 1) == 1)
            return Task.CompletedTask;

        // Don't hold up the boot: the site is usable while the sins pile up
        _ = Task.Run(async () =>
        {
            try { await SeedAsync(); }
            catch (Exception e) { logger.LogError(e, "Sinners seeder: failed to plant the sins of commandment VIII"); }
        }, CancellationToken.None);
        return Task.CompletedTask;
    }

    private async Task SeedAsync()
    {
        var watch = Stopwatch.StartNew();
        var children = settings.CurrentValue.ExodusChildThreshold + 100;
        var versions = settings.CurrentValue.ExodusVersionThreshold + 20;
        logger.LogInformation("Sinners seeder: planting {Children} form submissions and a counter with {Versions} versions", children, versions);

        var folderKey = await EnsureDataFolderAsync();

        var submission = await CreateTypeAsync("formSubmission", "Form submission", "icon-message", folderKey, ct =>
        {
            AddProperty(ct, Constants.DataTypes.Guids.TextstringGuid, "email", "Email");
            AddProperty(ct, Constants.DataTypes.Guids.TextareaGuid, "message", "Message");
            AddProperty(ct, Constants.DataTypes.Guids.DatePickerWithTimeGuid, "submittedAt", "Submitted at");
        });
        var counter = await CreateTypeAsync("visitorCounter", "Visitor counter", "icon-chart-curve", folderKey, ct =>
            AddProperty(ct, Constants.DataTypes.Guids.NumericGuid, "visits", "Visits"));
        var container = await CreateTypeAsync("formSubmissions", "Form submissions", "icon-inbox", folderKey, ct =>
        {
            ct.AllowedAsRoot = true;
            ct.ListView = Constants.DataTypes.Guids.ListViewContentGuid;
            ct.AllowedContentTypes =
            [
                new ContentTypeSort(submission.Key, 0, submission.Alias),
                new ContentTypeSort(counter.Key, 1, counter.Alias),
            ];
        });

        var inbox = contentService.Create("Form submissions", Constants.System.Root, container);
        inbox.Key = FormSubmissionsKey;
        contentService.Save(inbox);
        Publish(inbox);

        // One transaction for the lot, in batches so no single save holds hundreds of nodes
        var random = new Random(8);
        string[] first = ["Anna", "Bo", "Carl", "Dorte", "Emil", "Freja", "Gustav", "Hanne", "Ida", "Jens", "Karen", "Lars", "Mette", "Niels", "Ole", "Pia"];
        string[] topics = ["Quote request", "Newsletter", "Complaint", "Job application", "Partnership", "Support", "Feedback", "Booking"];
        var start = DateTime.Now.AddDays(-children);
        using (var scope = coreScopeProvider.CreateCoreScope())
        {
            var batch = new List<IContent>();
            for (var i = 1; i <= children; i++)
            {
                var name = first[random.Next(first.Length)];
                var node = contentService.Create($"{topics[random.Next(topics.Length)]} #{i:0000}", inbox.Id, submission);
                node.SetValue("email", $"{name.ToLowerInvariant()}{i}@example.com");
                node.SetValue("message", $"Hi, this is {name}. Please get back to me about this. (Submission {i})");
                node.SetValue("submittedAt", start.AddDays(i).AddMinutes(random.Next(1440)));
                batch.Add(node);
                if (batch.Count == 100)
                {
                    contentService.Save(batch);
                    batch.Clear();
                }
            }
            if (batch.Count > 0) contentService.Save(batch);
            scope.Complete();
        }
        logger.LogInformation("Sinners seeder: {Children} submissions in {Ms} ms", children, watch.ElapsedMilliseconds);

        // Every publish keeps the old version: a counter saved on every visit is a log table in disguise
        var visits = contentService.Create("Visitor counter", inbox.Id, counter);
        visits.Key = VisitorCounterKey;
        using (var scope = coreScopeProvider.CreateCoreScope())
        {
            for (var i = 1; i <= versions; i++)
            {
                visits.SetValue("visits", i * 17);
                contentService.Save(visits);
                Publish(visits);
            }
            scope.Complete();
        }

        logger.LogInformation("Sinners seeder: done in {Ms} ms", watch.ElapsedMilliseconds);
    }

    private void Publish(IContent content)
    {
        var result = contentService.Publish(content, ["*"]);
        if (!result.Success)
            throw new InvalidOperationException($"Could not publish {content.Name}: {result.Result}");
    }

    private void AddProperty(IContentType ct, Guid dataTypeKey, string alias, string name)
    {
        var dataType = dataTypeService.GetAsync(dataTypeKey).GetAwaiter().GetResult()
                       ?? throw new InvalidOperationException($"Built-in data type {dataTypeKey} is missing");
        if (!ct.PropertyGroups.Contains("content"))
            ct.AddPropertyGroup("content", "Content");
        ct.AddPropertyType(new PropertyType(shortStringHelper, dataType) { Alias = alias, Name = name }, "content", "Content");
    }

    private async Task<IContentType> CreateTypeAsync(string alias, string name, string icon, Guid folderKey, Action<IContentType> configure)
    {
        var existing = contentTypeService.Get(alias);
        if (existing is not null) return existing;

        var ct = new ContentType(shortStringHelper, Constants.System.Root)
        {
            Alias = alias,
            Name = name,
            Icon = icon,
            IsElement = false,
        };
        configure(ct);
        var attempt = await contentTypeService.CreateAsync(ct, Constants.Security.SuperUserKey);
        if (!attempt.Success)
            throw new InvalidOperationException($"Could not create document type {alias}: {attempt.Result}");
        await contentTypeService.MoveAsync(ct.Key, folderKey);
        return contentTypeService.Get(ct.Key)!;
    }

    // A "Data" folder: Rule II's autofill reads the folder name, so these classify themselves
    private async Task<Guid> EnsureDataFolderAsync()
    {
        var existing = (await containerService.GetAllAsync())
            .FirstOrDefault(c => c.ParentId == Constants.System.Root && string.Equals(c.Name, "Data", StringComparison.OrdinalIgnoreCase));
        if (existing is not null) return existing.Key;

        var attempt = await containerService.CreateAsync(null, "Data", null, Constants.Security.SuperUserKey);
        if (!attempt.Success) throw new InvalidOperationException("Could not create the Data document type folder");
        return attempt.Result!.Key;
    }
}
