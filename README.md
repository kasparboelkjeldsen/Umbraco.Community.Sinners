# Umbraco.Community.Sinners

### The 10 UmbraCommandments — a conference talk that escaped containment

This is a **development-time Umbraco 18 package** built as the live demo for the talk
*"The 10 UmbraCommandments"*. It audits your Umbraco installation against ten opinionated
architectural rules on a **Penance Board** dashboard in the Settings section, judges you,
and offers to absolve your sins — one keypress, one click, or one shouted absurdity at a time.

It is a sermon delivered as software. It is not a product.

---

## ⚠️ Thou shalt not run this anywhere that matters

Read this part twice:

- **A web request can edit your `.csproj` and rewrite your `Program.cs`.** On purpose.
  For comedy. On a stage. If that sentence didn't make you close the tab, you're our kind of sinner,
  but you still shouldn't install it.
- It **moves your document types and data types around**, creates folders, strips
  `AllowedAsRoot`, folds composition properties into page types, and saves every affected
  content node as a draft while doing it.
- It injects a voice-controlled presenter bar into the backoffice that hijacks the number keys
  and listens to your microphone for the word *"banana"*.
- It is deliberately **not** on NuGet and **not** tagged for the Umbraco Marketplace,
  and it never will be. The only way it gets into a solution is if you put it there
  with your own hands, knowing exactly what it is.

Use it on a throwaway site. Steal ideas from it. Laugh at it. Do not deploy it.

## The Ten UmbraCommandments

| # | Commandment | The fix |
|---|---|---|
| I | Content is not composable — no BlockList/BlockGrid/RichText on compositions | **Fold In** (value-preserving) or **Bless** |
| II | The Four Sacred Types — Page, Block, Data, Composition. Neither more nor fewer shalt thou count, for five is right out | Classify + auto-categorize into folders |
| III | Data types live in folders | Auto-organized, no mercy |
| IV | Program.cs is clean — thy registrations belong unto the Composer | One-click cleanse |
| V | The live environment is production-ready | Bless the missing settings |
| VI | Aliases are camelCase English (Hunspell-verified, no `nogetPaaDansk`) | Bless the false positives |
| VII | Translation keys are PascalCase English and nested in folders | Auto-group by prefix |
| VIII | No media items at root | ✨ *Pretend it's fixed* ✨ |
| IX | The root shall not render — no root node beareth a template | Seek Root Sanctuary (a templateless `siteRoot` in `Pages/Roots`) |
| X | uSync is installed, for the wind doth not git commit | ✨ Also pretend ✨ (or a real csproj injection, see warning above) |

There used to be six sacred types. Umbraco 18's Library took up the burden of the
Repositories, and they ascended. We do not mourn them; we count to four.

The full doctrine lives in [commandments.md](commandments.md), the slide headlines in
[gospel.md](gospel.md), and the original pre-repentance design in [spec.md](spec.md)
(a historical document — see its header for how far we strayed).

## The presenter rig (the part you actually cloned this for)

The talk is driven without trusting a single piece of venue hardware:

- **The bar** — four big numbered buttons fixed to the right edge of the backoffice, each
  showing exactly what it will do next ("Fold In & bless everything · 1/1"). Keys `1`–`4`
  mirror them, `5` toggles the bar, `0` is a full demo reset. It rides the Popover API into
  the browser's top layer, so not even Umbraco's modal dialogs can hide it.
- **The vanilla start** — the bar is hidden until summoned, so the first view of Umbraco is
  completely unspoiled. It is summoned by speaking the forbidden name: **"Sitecore"**
  (also accepted: *site call, sitecall, side core, psycho, cycle* — speech recognition is
  a lawless place). Say it again to banish it.
- **Magic words** — while the mic is on, four words from a 50-word pool (*pineapple, banana,
  banjo, tuxedo, …*) are live. Speaking one presses its button. The words have **no relation
  to what the buttons do** — that is the entire point. Fired words rotate out so the
  recognizer can't double-press, and the current words are printed right on the buttons.
- **"Hey Umbraco"** — the formal liturgy also works: wake phrase, six-second window, say a number.
- Everything falls back to clicks and keys, because the only hardware trusted less than a
  venue presenter-remote is a venue microphone.

Fair warning, speakers: the magic words are displayed on the projector, and there is no
defense against an audience member shouting **"TUXEDO"**. This is considered a feature.

## Running it (on something you do not love)

1. Clone. Scaffold a throwaway Umbraco 18 site under `Umbraco/<version>/` (SQLite,
   unattended install, the [Clean starter kit](https://www.nuget.org/packages/Clean) gives
   you beautifully sinful content to fix). Add a `ProjectReference` to
   `Umbraco.Community.Sinners.Backend` — see `CLAUDE.md` for the exact wiring, including
   the target that copies the frontend bundle into `App_Plugins`.
2. Run `.\reset.ps1 -Version <version>` — deletes the site's `umbraco` data folder,
   strips uSync from the csproj, and vandalizes `Program.cs` with a zalgo-cursed variable.
   Maximum sin, reproducibly.
3. `dotnet build`, boot, log in, go to **Settings → P̸e̷n̴a̵n̸c̶e̷**.
4. Press `0`, upload one image at the media root (Rule VIII needs a sinner), and confess.

Frontend dev loop: `npm run build` in `Umbraco.Community.Sinners.Extension/`.

## FAQ

**Can I use this in production?**
No.

**But what if—**
No.

**It found 46 sins in my project.**
That is not a question. Seek sanctuary.

**Is the fold-in safe?**
It preserved every content value in testing, saves drafts only, and was built in two days
for a talk. You already know the answer.

**Why does saying "psycho" open a sidebar?**
Because speech recognition thinks that's how Danes pronounce a competing CMS, and we
chose acceptance.

---

*Built for the talk. Blessed by no one. `git blame` knows what you did.*
