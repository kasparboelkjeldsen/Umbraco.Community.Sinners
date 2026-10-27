# Umbraco.Community.Sinners

### The 10 UmbraCommandments — a conference talk that escaped containment

This is a **development-time Umbraco 18 package** (built against 18.2.1) made as the live demo
for the talk *"The 10 UmbraCommandments"*. It audits your Umbraco installation against ten
opinionated architectural rules on a **Penance Board** dashboard in the Settings section,
judges you, and offers to absolve your sins — one clicker press at a time.

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
- It hijacks PageDown, PageUp, the arrow keys, `.`, Escape and the number keys across the
  whole backoffice, so a presentation clicker can drive the demo. Typing in a text field
  while it's installed is a penance of its own.
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

The whole demo runs on one button: the "next" button of an ordinary presentation clicker.
There is no on-screen rig, so the backoffice looks like plain Umbraco from first press to last.

| Key | What it does |
|---|---|
| **PageDown** / **→** (clicker next) | The next beat of the demo (see below) |
| **PageUp** / **←** (clicker back) | Nothing, on purpose. A misclick can't undo a fold-in |
| **`.`** (the clicker's blank button) | Exhibit the sin (on the Board) / return to the Board (anywhere else) |
| **Escape** | Nothing (swallowed, so a clicker's Esc can't close the exhibit you're showing) |
| `1` · `2` · `3` · `4` | Laptop fallback: next fix step · next commandment · exhibit/return · reload |
| `0` | Full demo reset: forget progress, back to the Board |

**Next** walks one script per commandment: *exhibit the sin* (jump to where it lives in
Umbraco), *return to the Board*, *each fix step*, *next commandment*. Commandments with
nothing to exhibit (IV, V, VI, X) go straight to their fixes. Off the Board, next always
means "take me back to the Board". After the last fix on X, next does nothing. The keys work
even with a text field focused, because exhibit pages autofocus their name field.

Progress lives in `sessionStorage`, so the full-page jumps between the Board and the
exhibits pick up where they left off. If the clicker dies, the fallback is walking over to
the laptop and pressing a number.

## Running it (on something you do not love)

1. Clone. Scaffold a throwaway Umbraco 18.2.1+ site under `Umbraco/<version>/` (SQLite,
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

**Didn't this used to be voice-controlled?**
It did, for one trial run. Shouting at a laptop turned out to be less fun than it sounds.
The clicker won. We do not speak of the walrus.

---

*Built for the talk. Blessed by no one. `git blame` knows what you did.*
