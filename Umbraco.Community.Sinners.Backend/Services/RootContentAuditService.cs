using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.Sinners.Backend.Models;

namespace Umbraco.Community.Sinners.Backend.Services;

public class RootContentAuditService(
    IContentService contentService,
    IContentTypeService contentTypeService,
    IContentTypeContainerService containerService,
    IScopeProvider scopeProvider,
    IShortStringHelper shortStringHelper)
{
    public async Task<RootContentAuditResult> AuditAsync()
    {
        using var scope = scopeProvider.CreateScope();
        var classifications = scope.Database.Fetch<DocTypeClassificationDto>()
            .ToDictionary(c => c.ContentTypeAlias, c => c.Classification, StringComparer.OrdinalIgnoreCase);
        scope.Complete();

        var rootNodes = contentService.GetRootContent().ToList();

        var nodeModels = rootNodes.Select(n =>
        {
            var isRepository = classifications.TryGetValue(n.ContentType.Alias, out var cls)
                && string.Equals(cls, "Repository", StringComparison.OrdinalIgnoreCase);
            return new RootNodeModel
            {
                Key = n.Key,
                Name = n.Name ?? n.Key.ToString(),
                ContentTypeAlias = n.ContentType.Alias,
                ContentTypeName = n.ContentType.Name ?? n.ContentType.Alias,
                IsRepository = isRepository,
            };
        }).ToList();

        return new RootContentAuditResult
        {
            IsClean = nodeModels.Count == 0 || nodeModels.All(n => n.IsRepository),
            RootNodes = nodeModels,
        };
    }

    public async Task<RepositorySanctuaryResult> SeekSanctuaryAsync()
    {
        var rootNodes = contentService.GetRootContent().ToList();
        if (rootNodes.Count == 0)
            return new RepositorySanctuaryResult { Success = true, Message = "Thy content tree is empty — no sanctuary is needed at this time." };

        using var scope = scopeProvider.CreateScope();
        var classifications = scope.Database.Fetch<DocTypeClassificationDto>()
            .ToDictionary(c => c.ContentTypeAlias, c => c.Classification, StringComparer.OrdinalIgnoreCase);
        scope.Complete();

        // Collect the non-repository content types currently at root
        var rootCtAliases = rootNodes.Select(n => n.ContentType.Alias).Distinct().ToList();
        var nonRepoContentTypes = rootCtAliases
            .Where(alias => !classifications.TryGetValue(alias, out var cls)
                || !string.Equals(cls, "Repository", StringComparison.OrdinalIgnoreCase))
            .Select(alias => contentTypeService.Get(alias))
            .Where(ct => ct is not null)
            .Cast<IContentType>()
            .ToList();

        // Step 1: Ensure a root-level "Repositories" folder exists
        var allContainers = (await containerService.GetAllAsync()).ToList();
        var repoContainer = allContainers.FirstOrDefault(c =>
            c.ParentId == -1 &&
            string.Equals(c.Name, "Repositories", StringComparison.OrdinalIgnoreCase));

        Guid repoFolderKey;
        if (repoContainer is null)
        {
            var attempt = await containerService.CreateAsync(null, "Repositories", null, Constants.Security.SuperUserKey);
            if (!attempt.Success)
                return new RepositorySanctuaryResult { Success = false, Message = "The 'Repositories' folder could not be created. Seek forgiveness elsewhere." };
            repoFolderKey = attempt.Result!.Key;
        }
        else
        {
            repoFolderKey = repoContainer.Key;
        }

        // Step 2: Create SiteRoot content type, or update the existing one
        var siteRoot = contentTypeService.Get("siteRoot");
        if (siteRoot is null)
        {
            var newType = new ContentType(shortStringHelper, -1)
            {
                Alias = "siteRoot",
                Name = "SiteRoot",
                Icon = "icon-globe",
                AllowedAsRoot = true,
                IsElement = false,
                AllowedContentTypes = nonRepoContentTypes
                    .Select((ct, i) => new ContentTypeSort(ct.Key, i, ct.Alias))
                    .ToArray(),
            };
            contentTypeService.Save(newType);
            siteRoot = newType;
            await contentTypeService.MoveAsync(siteRoot.Key, repoFolderKey);
        }
        else
        {
            var currentAllowed = (siteRoot.AllowedContentTypes ?? []).ToList();
            var currentKeys = currentAllowed.Select(a => a.Key).ToHashSet();
            var toAdd = nonRepoContentTypes.Where(ct => !currentKeys.Contains(ct.Key)).ToList();
            if (toAdd.Count > 0 || !siteRoot.AllowedAsRoot)
            {
                siteRoot.AllowedAsRoot = true;
                siteRoot.AllowedContentTypes = currentAllowed
                    .Concat(toAdd.Select((ct, i) => new ContentTypeSort(ct.Key, currentAllowed.Count + i, ct.Alias)))
                    .ToArray();
                await contentTypeService.UpdateAsync(siteRoot, Constants.Security.SuperUserKey);
            }
        }

        // Step 3: Classify SiteRoot as Repository in our table
        using var scope2 = scopeProvider.CreateScope();
        var existingClass = scope2.Database.SingleOrDefault<DocTypeClassificationDto>(
            "WHERE ContentTypeAlias = @0", "siteRoot");
        if (existingClass is null)
            scope2.Database.Insert(new DocTypeClassificationDto
            {
                ContentTypeAlias = "siteRoot",
                Classification = "Repository",
                CreatedUtc = DateTime.UtcNow,
                UpdatedUtc = DateTime.UtcNow,
            });
        else if (!string.Equals(existingClass.Classification, "Repository", StringComparison.OrdinalIgnoreCase))
        {
            existingClass.Classification = "Repository";
            existingClass.UpdatedUtc = DateTime.UtcNow;
            scope2.Database.Update(existingClass);
        }
        scope2.Complete();

        // Step 4: Strip AllowedAsRoot from the sinful content types
        foreach (var ct in nonRepoContentTypes)
        {
            if (ct.AllowedAsRoot)
            {
                ct.AllowedAsRoot = false;
                await contentTypeService.UpdateAsync(ct, Constants.Security.SuperUserKey);
            }
        }

        return new RepositorySanctuaryResult
        {
            Success = true,
            Message = "Thy sanctuary has been prepared. SiteRoot now stands ready in the Repositories folder, arms open to shelter thy flock. Go now to thy Content section — drag each root node beneath SiteRoot, and thy penance shall be complete.",
        };
    }
}

public record RootContentAuditResult
{
    public required bool IsClean { get; init; }
    public required IReadOnlyList<RootNodeModel> RootNodes { get; init; }
}

public record RootNodeModel
{
    public required Guid Key { get; init; }
    public required string Name { get; init; }
    public required string ContentTypeAlias { get; init; }
    public required string ContentTypeName { get; init; }
    public required bool IsRepository { get; init; }
}

public record RepositorySanctuaryResult
{
    public required bool Success { get; init; }
    public required string Message { get; init; }
}
