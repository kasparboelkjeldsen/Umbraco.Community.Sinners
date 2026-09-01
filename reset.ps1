param(
    [Parameter(Mandatory = $true)]
    [string]$Version
)

$root = Join-Path $PSScriptRoot "Umbraco\$Version"

if (-not (Test-Path $root)) {
    Write-Error "Folder not found: $root"
    exit 1
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
