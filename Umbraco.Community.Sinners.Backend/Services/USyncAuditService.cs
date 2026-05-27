using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Hosting;

namespace Umbraco.Community.Sinners.Backend.Services;

public class USyncAuditService(IWebHostEnvironment env)
{
    private static readonly Regex USyncRef = new(
        @"<PackageReference[^>]+Include=""uSync""",
        RegexOptions.IgnoreCase | RegexOptions.Compiled);

    private static readonly Regex DeployRef = new(
        @"<PackageReference[^>]+Include=""Umbraco\.Deploy",
        RegexOptions.IgnoreCase | RegexOptions.Compiled);

    public USyncAuditResult Audit()
    {
        var csprojFiles = Directory.GetFiles(env.ContentRootPath, "*.csproj");
        if (csprojFiles.Length == 0)
            return new USyncAuditResult { CsprojFound = false, HasUSync = false, HasUmbracoDeploy = false, CsprojName = null };

        var path = csprojFiles[0];
        var content = File.ReadAllText(path);

        return new USyncAuditResult
        {
            CsprojFound = true,
            CsprojName = Path.GetFileName(path),
            HasUSync = USyncRef.IsMatch(content),
            HasUmbracoDeploy = DeployRef.IsMatch(content),
        };
    }
}

public record USyncAuditResult
{
    public required bool CsprojFound { get; init; }
    public required bool HasUSync { get; init; }
    public required bool HasUmbracoDeploy { get; init; }
    public required string? CsprojName { get; init; }
}
