using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Web.Common.ApplicationBuilder;
using Umbraco.Community.Sinners.Backend.Middleware;

namespace Umbraco.Community.Sinners.Backend.Composers;

/// <summary>
/// Adds the stage rig's auto-login (<see cref="AutoLoginMiddleware"/>) at the very start of Umbraco's
/// pipeline, without touching Program.cs. It does nothing unless Sinners:AutoLoginEmail is set.
/// </summary>
public class AutoLoginComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder) =>
        builder.Services.Configure<UmbracoPipelineOptions>(options =>
            options.AddFilter(new UmbracoPipelineFilter("Sinners.AutoLogin")
            {
                PrePipeline = app => app.UseMiddleware<AutoLoginMiddleware>(),
            }));
}
