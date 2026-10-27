# Umbraco.Community.Sinners

Dev-time Umbraco package for a talk: "The 10 UmbraCommandments". Enforces opinionated architectural rules in the backoffice.

## Target

- Umbraco 18 — `net10.0` single target, no multi-targeting, no version guards. Backend references `Umbraco.Cms` `[18.2.1,19.0.0)` (compiles against 18.2.1, the latest stable as of Oct 2026); frontend `@umbraco-cms/backoffice` 18.2.1. Umbraco 17 is no longer supported (the doctrine is Library-era anyway).
- Test sites live under `Umbraco/` (local, not in this repo). Current demo target: `18.2.1/` (Clean 8.0.1 starter kit, uSync 18.1.5 in its props, admin@example.com / 1234567890, https://localhost:44343, http on 8699 is rejected by the backoffice login). It was created by copying `18.1.1/` (the 18.2.1 project template only differs in version numbers); older `17.x/` and `18.1.1/` folders may still exist locally but aren't in the solution.
- The site consumes Sinners via ProjectReference; a `CopySinnersUiAssets` target in its csproj copies `Backend/ui/**` into `wwwroot/App_Plugins/umbraco.community.sinners.frontend/` on every build.
- **Demo reset ritual**: `.\reset.ps1 -Version 18.2.1` (deletes `Umbraco/18.2.1/umbraco` data folder, strips uSync from csproj/props, overwrites Program.cs with the zalgo sin) → `dotnet build` → boot (unattended install + Clean import, ~90s) → press `0` in the backoffice (clears browser demo state) → upload one image at media root (Rule VIII sin).
- Umbraco 18 auth note (for scripted Management API access): tokens are redacted into encrypted HttpOnly cookies (`__Host-umbAccessToken` etc.). Send `Authorization: Bearer [redacted]` (literal) plus the cookie jar — middleware substitutes the real token. Access tokens expire in ~5 min.

## Solution structure

```
Umbraco.Community.Sinners.Backend/   # C# package
  Composers/        # IComposer registrations
  Controllers/      # Management API controllers (single: SinnersManagementApiController)
  Middleware/       # AutoLoginMiddleware (stage rig: always logged in, dev only)
  Dictionaries/     # Embedded Hunspell en_US.aff + en_US.dic (for Rules VI & VII)
  Migrations/       # AsyncMigrationBase migrations + PackageMigrationPlan
  Models/           # NPoco DTOs
  Services/         # Business logic

Umbraco.Community.Sinners.Extension/ # Frontend package (Vite + Lit)
  src/
    index.ts                         # Entry point: registers manifests via onInit
    penance/
      penance-dashboard.element.ts   # Vertical tab shell (tab strip left, content right)
      commandments/
        content-not-composable.element.ts  # Rule I
        six-sacred-types.element.ts        # Rule II
        data-types-in-folders.element.ts   # Rule III
        program-cs-clean.element.ts        # Rule IV
        production-settings.element.ts     # Rule V
        alias-audit.element.ts             # Rule VI
        translation-audit.element.ts       # Rule VII
        root-media.element.ts              # Rule VIII
```

## Architecture conventions

### Backend
- Controllers extend `ManagementApiControllerBase` (from `Umbraco.Cms.Api.Management.Controllers`).
- Route prefix: `umbraco/management/api/v{version:apiVersion}/sinners`.
- Migrations use `AsyncMigrationBase` with `MigrateAsync()` override.
- Migration plan uses `PackageMigrationPlan` from `Umbraco.Cms.Core.Packaging` with `DefinePlan()`.
- Register migration plan: `builder.PackageMigrationPlans().Add<SinnersMigrationPlan>()`.
- DB access via `IScopeProvider` + NPoco (`scope.Database.Fetch<T>()`, Insert, Update, Delete).
- Document type containers/folders: inject `IContentTypeContainerService`, call `GetAllAsync()`. **Do NOT use** `IEntityService.GetAll(UmbracoObjectTypes.DocumentTypeContainer)` — throws `NotSupportedException` in v17.
- Moving content types between folders: `IContentTypeService.MoveAsync(contentTypeKey, containerKey)`.
- Saving/updating content types: `await contentTypeService.UpdateAsync(item, Constants.Security.SuperUserKey)` — `Save()` is obsolete in v17.
- Deleting content types: `await contentTypeService.DeleteAsync(key, Constants.Security.SuperUserKey)`.
- Getting a data type: `await dataTypeService.GetAsync(Guid key)`.
- Property group types: `PropertyGroupType.Group` (= 0) and `PropertyGroupType.Tab` (= 1), in `Umbraco.Cms.Core.Models`. When adding a property to a page type that composes a group with a given alias, **the group type must match** or Umbraco throws `InvalidCompositionException`. After `AddPropertyType(prop, groupAlias, groupName)`, find the group and set its `Type` to match the composition's group.
- Creating a new property type from an existing data type: `new PropertyType(IShortStringHelper, IDataType)`, inject `IShortStringHelper`.
- `IContentService.GetPagedOfType` — interface signature has non-nullable filter but implementation accepts `null!`.
- Getting root media items: `IMediaService.GetRootMedia()` (synchronous).
- Dictionary (translation) items: `IDictionaryItemService`. Key methods:
  - `GetDescendantsAsync(null)` — returns ALL dictionary items flat (null parentId = all)
  - `GetAtRootAsync()` — root items only
  - `CreateAsync(new DictionaryItem(parentId, itemKey), userKey)` — create item
  - `MoveAsync(item, parentGuid, userKey)` — re-parents without changing `ItemKey`
  - `IDictionaryItem.Key` = Guid identifier; `.ItemKey` = string key (e.g. "Article.By"); `.ParentId` = Guid?
- `IWebHostEnvironment.ContentRootPath` for locating `Program.cs` and `appsettings*.json`.

### Frontend
- Framework: Lit 3 web components, TypeScript, bundled by Vite.
- Context: `UmbElementMixin` + `consumeContext(UMB_AUTH_CONTEXT, ...)` for auth token.
- Authenticated fetch: `authCtx.getLatestToken()` → `Authorization: Bearer <token>`.
- Dashboard registered programmatically in `onInit` with `element: PenanceDashboardElement` (class ref, not string) — avoids URL module import error.
- **One file per commandment** under `src/penance/commandments/`. Each is a self-contained custom element with its own styles, state, and API calls. `penance-dashboard.element.ts` is a thin shell that imports and renders them.
- **Tab layout**: vertical tab strip (260px left column, `border-right`), content `flex: 1` on the right. All commandment elements always in DOM (`display:none` for inactive) so status events fire for all tabs on initial load. Do NOT use `uui-tab-group` — it has a 352px fixed shadow-DOM width that clips tabs.
- **Status events**: each commandment dispatches `sinners-status` (`{ issueCount: number, severity: 'ok' | 'warning' | 'error' }`) with `bubbles: true, composed: true`. Dashboard renders a badge per tab.
- **Clicker controls** (talk controls): `presenter.ts` (state + script) and `listenForClicker()` in `index.ts` (keys). No on-screen UI: the backoffice stays vanilla, the fallback is walking to the laptop. There used to be an on-screen presenter bar and voice control; both were removed after a trial run, so don't bring them back.
  - One capture-phase `keydown` listener on `window`, `preventDefault` + `stopPropagation`, hot even with an input focused (exhibit workspaces autofocus their name field), auto-repeat ignored. PageDown/ArrowRight = `presenter.forward()`; PageUp/ArrowLeft/Escape = swallowed, do nothing (Kaspar's call: back must never undo a fix); `.` = `dot()`; fallback `1` = `next()`, `2` = `nextTab()`, `3` = `dot()`, `4` = reload, `0` = `reset()`.
  - `forward()` = one beat. Off the Board: `dot()` (return; `/umbraco/section/content` returns via `/umbraco/section/settings`, so IX's exhibit costs one extra press). On the Board, per active tab: exhibit if the tab has a `TAB_URLS` entry and isn't in `exhibited` yet → each registered step → `nextTab()`; on X with all steps done it does nothing. Order per tab: exhibit, return, fixes, next tab (Kaspar's choice).
  - `dot()` on the Board marks the tab as exhibited, so a manual `.`/`3` exhibit isn't repeated by the clicker. `next()`/`forward()` ignore presses while a step is still running (`_busy`).
  - `registerSteps(tabId, host, steps)` and `onNextTab(host, fn)` take the registering element; at run time the presenter uses the most recent registration whose host `isConnected`, in case the backoffice builds a dashboard twice and throws one copy away.
  - State (active tab, step indices, exhibited tabs) persists in sessionStorage (`sinners-presenter-state`) so full-page exhibit round-trips resume; the dashboard prefers the persisted tab over its first-sinful-tab auto-jump. `0` clears it plus the Rule VIII pretend flag.
  - **Inside the talk's deck** (can-present, `decks/umbracommandments`): the backoffice runs as a same-origin iframe through the deck's dev-server proxy (http://localhost:5180/umbraco). The deck sets `<html data-sinners-keys="off">` in the iframe while the clicker belongs to the deck; `listenForClicker` then ignores every key. At DEMO TIME the deck sets it `on` and forwards the clicker into the iframe. The 18.2.1 site's local `appsettings.Development.json` needs `Security:BackOfficeHost = http://localhost:5180` (OpenIddict rejects the proxied redirect_uri otherwise; direct login on :44343 may break while it's set), `Global:TimeOut = 1.00:00:00` and `Security:KeepUserLoggedIn = true` (the default 20-minute timeout ends the session mid-talk).
  - **Always logged in** (`Middleware/AutoLoginMiddleware.cs`, added by `AutoLoginComposer` as an Umbraco pipeline filter at `PrePipeline`, so Program.cs stays untouched for Rule IV): when `Sinners:AutoLoginEmail` is set, the environment is Development and the request comes from this machine (loopback, which includes the deck's Vite proxy), a GET of `/umbraco/login` signs that user in with `IBackOfficeSignInManager.SignInAsync(user, isPersistent: true)` and redirects to its `ReturnUrl` (local URLs only). The OpenIddict authorize endpoint then issues the code as after a normal login. Signing out works but signs you straight back in. The 18.2.1 test site sets it to `admin@example.com` in its local `appsettings.Development.json`. Verified: a cookie-less client goes authorize → login → authorize → `oauth_complete?code=…` with no credentials; a browser signed out via `/umbraco/management/api/v1/security/back-office/signout` lands back in the backoffice as admin.
  - Verifying in a hidden/background browser pane: rendering is throttled and a step can run before the commandment has loaded its data (it then finds nothing to fix). Force a frame (screenshot) and wait for the tab to render before pressing next.
- Build: `npm run build` in `Umbraco.Community.Sinners.Extension/`.

### Spell checking (Rules VI & VII)
- Package: `WeCantSpell.Hunspell` 7.0.1
- Dictionary files: `Dictionaries/en_US.aff` + `Dictionaries/en_US.dic` as `<EmbeddedResource>` in the .csproj
- Loaded once via `HunspellDictionary` static class (`Lazy<WordList>`, thread-safe). Both `AliasAuditService` and `TranslationAuditService` use `HunspellDictionary.EnUs`.
- `HunspellDictionary.TechAllowList` contains common tech terms (`umbraco`, `html`, `seo`, `api`, etc.) that skip the dictionary check.

## The Ten UmbraCommandments (implementation status)

| # | Rule | Status |
|---|------|--------|
| I | Content is not composable — no BlockList/BlockGrid/RichText on compositions | ✅ Done |
| II | The Four Sacred Types — classify all content types, enforce root folder naming | ✅ Done |
| III | Data types live in folders — auto-organize loose data types | ✅ Done |
| IV | Program.cs is clean — no saved variable, no non-standard middleware/endpoints | ✅ Done |
| V | Live environment is production-ready — scan appsettings for 5 required settings | ✅ Done |
| VI | Document type aliases are camelCase English | ✅ Done |
| VII | Translation keys are PascalCase English and nested in folders | ✅ Done |
| VIII | No media items at root — list only, user fixes manually | ✅ Done |
| IX | The root shall not render — no root content node may bear a template | ✅ Done |
| X | uSync is installed — schema must be version-controlled | ✅ Done |

### Rule I detail
Surfaces compositions that expose BlockList, BlockGrid, or RichText. For each sinful property:
- **Fold In**: moves the property from the composition directly onto every page type that uses it, preserving all content values via a 4-step tmp-alias dance.
- **Bless**: marks a property as intentionally composable (persisted in `SinnersBlessing` table); chip turns green, property still shows, fold-in still offered.
- **Empty compositions**: doc types with zero property types (e.g. post-fold-in) are listed in a sub-section with a Delete button. Only shown if a composition is classified as "Composition" in Rule II. Does NOT contribute to the status badge count (it's a cleanup helper, not a rule violation).

#### Fold-in algorithm
1. Add `{alias}_fold_tmp` to each page type in the same group (matching group type) as the original
2. Copy content values from `{alias}` → `{alias}_fold_tmp` for every node (culture-aware)
3. Remove `{alias}` from the composition
4. Rename `{alias}_fold_tmp` → `{alias}` on each page type (property type ID unchanged, data stays intact)

Content nodes are saved as drafts only — published nodes need manual re-publish.

### Rule III detail
Auto-moves data types at root (`ParentId == -1`) into folders. Built-in data types (`Id < 0`) are included.
- With `DatatypePrefix` config: `/<prefix>/<datatype-alias>/<name>`
- Without prefix: `/Umbraco/<datatype-alias>/<name>`
- Uses `IDataTypeContainerService.CreateAsync` + `IDataTypeService.MoveAsync`.

### Rule VI detail
Checks every content type alias is:
1. Valid camelCase: `^[a-z][a-zA-Z0-9]*$`
2. Made of recognized English words (Hunspell) after splitting on camelCase boundaries
- Tech allowlist prevents false positives for common terms
- Per-alias blessing persisted in `SinnersAliasBlessing` table

### Rule VII detail
Checks every dictionary item `ItemKey` is:
1. Valid PascalCase per segment: each `.`-separated segment matches `^[A-Z][a-zA-Z0-9]*$`
2. Made of recognized English words after splitting on boundaries
- Translation keys use PascalCase (e.g. `Article.By`), NOT camelCase — this is intentional
- **Grouping helper**: finds root-level items with dot-notation keys that share a prefix (e.g. `Article.By` + `Article.On` → suggests creating `Article` parent). Children keep their full key after move.
- Per-key blessing persisted in `SinnersTranslationBlessing` table

### Rule IX detail (Library era — Umbraco 18)
Checks whether any root content node is *renderable*: sinner if the node has a template assigned (`TemplateId`), or its content type has a `DefaultTemplate` or any `AllowedTemplates`. Repository classification is no longer involved.
- **Error**: any root node that beareth a template
- **Seek Root Sanctuary** button:
  1. Finds or creates a root-level "Pages" folder, then a "Roots" subfolder, in Document Types
  2. Creates a `siteRoot` content type (name "SiteRoot", `icon-globe`, `AllowedAsRoot = true`, `IsElement = false`, no template) in `Pages/Roots` — or updates an existing one
  3. Adds all template-bearing root content types as `AllowedContentTypes` on SiteRoot
  4. Classifies `siteRoot` as "Page" in `SinnersDocTypeClassification`
  5. Removes `AllowedAsRoot` from the template-bearing root content types
  6. Shows a message instructing the user to create a SiteRoot node and move renderable roots under it manually
- Content NODES are not moved automatically — the user must drag them in the Content section
- Status badge remains error until the template-bearing nodes have been moved off the root
- Content type creation uses `contentTypeService.Save(newType)` (for the initial create) + `MoveAsync` to place it in the folder
- Endpoint: `POST seek-root-sanctuary` (renamed from `seek-repository-sanctuary`)

### Rule X detail
Inspects the project's `.csproj` file (found via `IWebHostEnvironment.ContentRootPath`) for a `PackageReference Include="uSync"` entry.
- Clean: uSync reference found
- Error: no uSync reference — schema is unversioned
- Edge case: no `.csproj` found at content root → shows a neutral warning, not an error (badge = ok)
- Read-only — no automated fix; user installs the NuGet package manually

### Rule corrections vs original spec
- **Rule I**: Surface and fix compositions that *contain* a complex editor — not block adding them. Reason: blocking would prevent loading the existing backoffice.
- **Rule III**: Auto-move data type to folder — don't warn, just fix.
- **Rule V**: Umbraco already has a Live Environment health check — add as a reminder on the Penance board only, don't implement from scratch.
- **Rule VIII**: Read-only list only — no automated fix, user moves media manually.

## DB tables

| Table | Key | Purpose | Migration |
|---|---|---|---|
| `SinnersDocTypeClassification` | `ContentTypeAlias` | Manual + auto classifications for Rule II | v1 |
| `SinnersBlessing` | `Id` (auto-increment) | Blessed composition properties for Rule I | v2 |
| `SinnersAliasBlessing` | `Id` (auto-increment) | Blessed content type aliases for Rule VI | v3 |
| `SinnersTranslationBlessing` | `Id` (auto-increment) | Blessed translation keys for Rule VII | v4 |

Migration plan: `SinnersMigrationPlan` chains v1 → v2 → v3 → v4.

## Root folder mapping (Rule II auto-categorize)
The Four Sacred Types (Umbraco 18's Library owns shared content now, so Repository/RepositoryItem are gone; legacy rows with those classifications are surfaced as unclassified and skipped by auto-categorize):
| Classification | Expected root folder |
|---|---|
| Page | Pages |
| Block | Blocks |
| Data | Data |
| Composition | Compositions |
