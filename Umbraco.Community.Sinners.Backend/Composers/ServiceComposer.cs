using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Community.Sinners.Backend.Configuration;
using Umbraco.Community.Sinners.Backend.Migrations;
using Umbraco.Community.Sinners.Backend.Services;

namespace Umbraco.Community.Sinners.Backend.Composers;

public class ServiceComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.Configure<SinnersSettings>(builder.Config.GetSection(SinnersSettings.SectionName));

        builder.Services.AddScoped<DocTypeClassificationService>();
        builder.Services.AddScoped<BlessingService>();
        builder.Services.AddScoped<ContentNotComposableService>();
        builder.Services.AddScoped<FoldInService>();
        builder.Services.AddScoped<DataTypeOrganizationService>();
        builder.Services.AddScoped<ProgramCsAnalyzerService>();
        builder.Services.AddScoped<ProductionReadinessService>();
        builder.Services.AddScoped<AliasAuditService>();
        builder.Services.AddScoped<TranslationAuditService>();
        builder.Services.AddScoped<RootMediaService>();
        builder.Services.AddScoped<RootContentAuditService>();
        builder.Services.AddScoped<USyncAuditService>();

        builder.PackageMigrationPlans()
            .Add<SinnersMigrationPlan>();
    }
}
