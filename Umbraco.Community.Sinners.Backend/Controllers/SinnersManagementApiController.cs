using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Community.Sinners.Backend.Services;

namespace Umbraco.Community.Sinners.Backend.Controllers;

[ApiVersion("1.0")]
[Route("umbraco/management/api/v{version:apiVersion}/sinners")]
public class SinnersManagementApiController : ManagementApiControllerBase
{
    private readonly DocTypeClassificationService _classificationService;
    private readonly ContentNotComposableService _compositionService;
    private readonly FoldInService _foldInService;
    private readonly BlessingService _blessingService;
    private readonly DataTypeOrganizationService _dataTypeOrganizationService;
    private readonly ProgramCsAnalyzerService _programCsAnalyzerService;
    private readonly ProductionReadinessService _productionReadinessService;
    private readonly AliasAuditService _aliasAuditService;
    private readonly TranslationAuditService _translationAuditService;
    private readonly RootMediaService _rootMediaService;
    private readonly RootContentAuditService _rootContentAuditService;
    private readonly USyncAuditService _uSyncAuditService;

    public SinnersManagementApiController(
        DocTypeClassificationService classificationService,
        ContentNotComposableService compositionService,
        FoldInService foldInService,
        BlessingService blessingService,
        DataTypeOrganizationService dataTypeOrganizationService,
        ProgramCsAnalyzerService programCsAnalyzerService,
        ProductionReadinessService productionReadinessService,
        AliasAuditService aliasAuditService,
        TranslationAuditService translationAuditService,
        RootMediaService rootMediaService,
        RootContentAuditService rootContentAuditService,
        USyncAuditService uSyncAuditService)
    {
        _classificationService = classificationService;
        _compositionService = compositionService;
        _foldInService = foldInService;
        _blessingService = blessingService;
        _dataTypeOrganizationService = dataTypeOrganizationService;
        _programCsAnalyzerService = programCsAnalyzerService;
        _productionReadinessService = productionReadinessService;
        _aliasAuditService = aliasAuditService;
        _translationAuditService = translationAuditService;
        _rootMediaService = rootMediaService;
        _rootContentAuditService = rootContentAuditService;
        _uSyncAuditService = uSyncAuditService;
    }

    [HttpGet("sinful-compositions")]
    [ProducesResponseType<IEnumerable<SinfulCompositionModel>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSinfulCompositions() =>
        Ok(await _compositionService.GetSinfulCompositionsAsync());

    [HttpGet("content-type-classifications")]
    [ProducesResponseType<IEnumerable<ContentTypeClassificationModel>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll() =>
        Ok(await _classificationService.GetAllWithClassification());

    [HttpPost("auto-categorize")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> AutoCategorize()
    {
        await _classificationService.AutoCategorizeAsync();
        return Ok();
    }

    [HttpPost("content-type-classifications")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public IActionResult SetClassification([FromBody] SetClassificationRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.ContentTypeAlias) || string.IsNullOrWhiteSpace(request.Classification))
            return ValidationProblem("ContentTypeAlias and Classification are required.");

        _classificationService.SetClassification(request.ContentTypeAlias, request.Classification);
        return Ok();
    }

    [HttpPost("fold-in")]
    [ProducesResponseType<FoldInResult>(StatusCodes.Status200OK)]
    public async Task<IActionResult> FoldIn([FromBody] FoldInRequest request) =>
        Ok(await _foldInService.FoldInAsync(request.CompositionAlias, request.PropertyAlias));

    [HttpPost("bless")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult Bless([FromBody] BlessRequest request)
    {
        _blessingService.SetBlessed(request.CompositionAlias, request.PropertyAlias, request.Blessed);
        return Ok();
    }

    [HttpGet("empty-compositions")]
    [ProducesResponseType<IEnumerable<EmptyCompositionModel>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetEmptyCompositions() =>
        Ok(await _compositionService.GetEmptyCompositionsAsync());

    [HttpGet("production-readiness")]
    [ProducesResponseType<ProductionReadinessResult>(StatusCodes.Status200OK)]
    public IActionResult GetProductionReadiness() =>
        Ok(_productionReadinessService.Audit());

    [HttpPost("bless-production-setting")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult BlessProductionSetting([FromBody] BlessProductionSettingRequest request)
    {
        _productionReadinessService.SetSettingBlessed(request.SettingKey, request.Blessed);
        return Ok();
    }

    [HttpGet("program-cs-audit")]
    [ProducesResponseType<ProgramCsAuditResult>(StatusCodes.Status200OK)]
    public IActionResult GetProgramCsAudit() =>
        Ok(_programCsAnalyzerService.Audit());

    [HttpPost("fix-program-cs")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult FixProgramCs() =>
        _programCsAnalyzerService.FixSavedVariable() ? Ok() : NotFound();

    [HttpGet("unorganized-data-types")]
    [ProducesResponseType<IEnumerable<UnorganizedDataTypeModel>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUnorganizedDataTypes() =>
        Ok(await _dataTypeOrganizationService.GetUnorganizedAsync());

    [HttpPost("organize-data-types")]
    [ProducesResponseType<OrganizeDataTypesResult>(StatusCodes.Status200OK)]
    public async Task<IActionResult> OrganizeDataTypes()
    {
        var count = await _dataTypeOrganizationService.OrganizeAllAsync();
        return Ok(new OrganizeDataTypesResult { OrganizedCount = count });
    }

    [HttpDelete("empty-compositions/{alias}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteEmptyComposition(string alias)
    {
        var found = await _compositionService.DeleteCompositionAsync(alias);
        return found ? Ok() : NotFound();
    }

    [HttpGet("alias-issues")]
    [ProducesResponseType<IEnumerable<AliasIssueModel>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAliasIssues() =>
        Ok(await _aliasAuditService.GetAliasIssuesAsync());

    [HttpPost("bless-alias")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult BlessAlias([FromBody] BlessAliasRequest request)
    {
        _aliasAuditService.SetAliasBlessed(request.ContentTypeAlias, request.Blessed);
        return Ok();
    }

    [HttpGet("translation-audit")]
    [ProducesResponseType<TranslationAuditResult>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetTranslationAudit() =>
        Ok(await _translationAuditService.GetAuditAsync());

    [HttpPost("bless-translation")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult BlessTranslation([FromBody] BlessTranslationRequest request)
    {
        _translationAuditService.SetKeyBlessed(request.ItemKey, request.Blessed);
        return Ok();
    }

    [HttpGet("root-media")]
    [ProducesResponseType<IEnumerable<RootMediaItemModel>>(StatusCodes.Status200OK)]
    public IActionResult GetRootMedia() =>
        Ok(_rootMediaService.GetRootMediaItems());

    [HttpPost("create-translation-group")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateTranslationGroup([FromBody] CreateTranslationGroupRequest request)
    {
        var ok = await _translationAuditService.CreateGroupAsync(request.ParentKey, request.ChildIds);
        return ok ? Ok() : ValidationProblem($"Failed to create or find parent '{request.ParentKey}'.");
    }

    [HttpGet("root-content-audit")]
    [ProducesResponseType<RootContentAuditResult>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetRootContentAudit() =>
        Ok(await _rootContentAuditService.AuditAsync());

    [HttpPost("seek-repository-sanctuary")]
    [ProducesResponseType<RepositorySanctuaryResult>(StatusCodes.Status200OK)]
    public async Task<IActionResult> SeekRepositorySanctuary() =>
        Ok(await _rootContentAuditService.SeekSanctuaryAsync());

    [HttpGet("usync-audit")]
    [ProducesResponseType<USyncAuditResult>(StatusCodes.Status200OK)]
    public IActionResult GetUSyncAudit() =>
        Ok(_uSyncAuditService.Audit());

    [HttpPost("inject-usync")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult InjectUSync() =>
        _uSyncAuditService.InjectUSync() ? Ok() : NotFound();
}

public record SetClassificationRequest
{
    public string ContentTypeAlias { get; init; } = string.Empty;
    public string Classification { get; init; } = string.Empty;
}

public record FoldInRequest
{
    public string CompositionAlias { get; init; } = string.Empty;
    public string PropertyAlias { get; init; } = string.Empty;
}

public record OrganizeDataTypesResult
{
    public int OrganizedCount { get; init; }
}

public record BlessRequest
{
    public string CompositionAlias { get; init; } = string.Empty;
    public string PropertyAlias { get; init; } = string.Empty;
    public bool Blessed { get; init; }
}

public record BlessAliasRequest
{
    public string ContentTypeAlias { get; init; } = string.Empty;
    public bool Blessed { get; init; }
}

public record BlessTranslationRequest
{
    public string ItemKey { get; init; } = string.Empty;
    public bool Blessed { get; init; }
}

public record BlessProductionSettingRequest
{
    public string SettingKey { get; init; } = string.Empty;
    public bool Blessed { get; init; }
}

public record CreateTranslationGroupRequest
{
    public string ParentKey { get; init; } = string.Empty;
    public List<Guid> ChildIds { get; init; } = [];
}
