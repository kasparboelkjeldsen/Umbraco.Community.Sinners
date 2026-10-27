param(
    [Parameter(Mandatory = $true)]
    [string]$Version
)

$root = Join-Path $PSScriptRoot "Umbraco\$Version"

if (-not (Test-Path $root)) {
    Write-Error "Folder not found: $root"
    exit 1
}

# --- Wipe the umbraco data folder (DB, logs, models) so the next boot reinstalls fresh ---

$umbracoData = Join-Path $root "umbraco"
if (Test-Path $umbracoData) {
    try {
        Remove-Item $umbracoData -Recurse -Force -ErrorAction Stop
        Write-Host "Deleted $umbracoData -- next boot reinstalls Umbraco + Clean starter kit"
    }
    catch {
        Write-Error "Could not delete $umbracoData -- is the site still running? Stop it and re-run."
        exit 1
    }
}
else {
    Write-Host "No umbraco data folder found -- already blank"
}
# (That also takes the pretences, the confessions and the Exodus exports: they live in umbraco/Data.)

# --- Forget every blessing (Sinners:BlessingsPath, default sinners.blessings.json in the content root) ---

$blessings = Join-Path $root "sinners.blessings.json"
if (Test-Path $blessings) {
    Remove-Item $blessings -Force
    Write-Host "Deleted sinners.blessings.json -- nothing is blessed"
}

# --- Commandment VII: a nav partial that searches the whole tree on every request ---
# Clean copies its own views on every build but never deletes extra ones, so this one survives builds.

$megaMenu = Join-Path $root "Views\Partials\megaMenu.cshtml"
$megaMenuContent = @'
@inherits UmbracoViewPage
@using Umbraco.Cms.Core.Services
@using ContentModels = Umbraco.Cms.Web.Common.PublishedModels
@inject IContentService ContentService

@* Mega menu: every section with every page under it, plus the latest articles *@
@{
    var root = Model.Root();
    var sections = root.Children().Where(x => x.IsVisible());
    var latest = Model.Root().Descendants<ContentModels.Article>().OrderByDescending(x => x.CreateDate).Take(5);
    var pageCount = ContentService.CountDescendants(root.Id);
}

<nav class="mega-menu" data-page-count="@pageCount">
    @foreach (var section in sections)
    {
        <div class="mega-menu__column">
            <a class="mega-menu__heading" href="@section.Url()">@section.Name</a>
            <ul>
                @foreach (var page in section.DescendantsOrSelf().Where(x => x.IsVisible()))
                {
                    <li><a href="@page.Url()">@page.Name</a></li>
                }
            </ul>
        </div>
    }
    <div class="mega-menu__column">
        <span class="mega-menu__heading">Latest</span>
        <ul>
            @foreach (var article in latest)
            {
                <li><a href="@article.Url()">@article.Name</a></li>
            }
        </ul>
    </div>
</nav>
'@
[System.IO.File]::WriteAllText($megaMenu, $megaMenuContent, [System.Text.UTF8Encoding]::new($false))
Write-Host "Wrote Views\Partials\megaMenu.cshtml (Rule VII sinner)"

# --- Commandments III and VIII: the seeder plants root media and a warehouse at boot, if it's allowed to ---

$devSettings = Join-Path $root "appsettings.Development.json"
if (-not ((Test-Path $devSettings) -and ((Get-Content $devSettings -Raw) -match '"SeedSins"\s*:\s*true'))) {
    Write-Warning "appsettings.Development.json has no ""Sinners"": { ""SeedSins"": true } -- Rule VIII will have no warehouse to lead out"
}

# --- Remove uSync from .csproj ---

$csproj = Get-ChildItem -Path $root -Filter "*.csproj" | Select-Object -First 1
if (-not $csproj) {
    Write-Error "No .csproj found in $root"
    exit 1
}

$csprojContent = Get-Content $csproj.FullName -Raw
$uSyncRef = '<PackageReference Include="uSync"\s*/>'
if ($csprojContent -match '<PackageReference Include="Clean"\s*/>') {
    # Clean already referenced (v18 template sites) — just remove uSync, don't create a duplicate
    $newCsprojContent = $csprojContent -replace "\s*$uSyncRef", ''
    Write-Host "Removed uSync from $($csproj.Name) (Clean already present)"
}
else {
    $newCsprojContent = $csprojContent -replace $uSyncRef, '<PackageReference Include="Clean" />'
    Write-Host "Swapped uSync -> Clean in $($csproj.Name)"
}
Set-Content -Path $csproj.FullName -Value $newCsprojContent -Encoding utf8 -NoNewline

# --- Update Directory.Packages.props ---

$propsFile = Join-Path $root "Directory.Packages.props"
if (Test-Path $propsFile) {
    $propsContent = Get-Content $propsFile -Raw
    $uSyncVer = '<PackageVersion Include="uSync"\s*Version="[^"]*"\s*/>'
    if ($propsContent -match '<PackageVersion Include="Clean"') {
        $propsContent = $propsContent -replace "\s*$uSyncVer", ''
    }
    else {
        $propsContent = $propsContent -replace $uSyncVer, '<PackageVersion Include="Clean" Version="7.0.5" />'
    }
    Set-Content -Path $propsFile -Value $propsContent -Encoding utf8 -NoNewline
    Write-Host "Updated Directory.Packages.props"
}

# --- Overwrite Program.cs ---

$programCs = Join-Path $root "Program.cs"
if (-not (Test-Path $programCs)) {
    Write-Error "Program.cs not found in $root"
    exit 1
}

# Build zalgo "illigal" from explicit char codes — immune to .ps1 file encoding issues
$zalgo = [string]::new([char[]]@(
    0x0069, 0x0338, 0x0316,   # i
    0x006C, 0x0337, 0x033C,   # l
    0x006C, 0x0334, 0x032E,   # l
    0x0069, 0x0335, 0x0317,   # i
    0x0067, 0x0338, 0x032B,   # g
    0x0061, 0x0337, 0x032E,   # a
    0x006C, 0x0336, 0x033C    # l
))

$programContent = @"

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();


await app.BootUmbracoAsync();


var $zalgo = app.UseUmbraco();

$zalgo.WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

await app.RunAsync();

// dotnet add Umbraco/$Version/Umbraco-$Version.csproj package uSync
"@

[System.IO.File]::WriteAllText($programCs, $programContent, [System.Text.Encoding]::UTF8)
Write-Host "Overwrote Program.cs"

Write-Host ""
Write-Host "Server-side sin is maximised (the seeder plants III's root media and VIII at first boot). Clicker" -ForegroundColor Yellow
Write-Host "progress and exhibited sins live in the browser: they auto-invalidate on fresh installs" -ForegroundColor Yellow
Write-Host "-- or press 0 in the backoffice for a full demo-state reset." -ForegroundColor Yellow
