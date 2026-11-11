import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UMB_THEME_CONTEXT } from '@umbraco-cms/backoffice/themes';
import { SPOOKY_ALIAS } from './spooky-themes.js';
import { presenter } from './presenter.js';
import { boardMounted } from './bridge.js';
import './commandments/content-not-composable.element.js';
import './commandments/four-sacred-types.element.js';
import './commandments/data-types-in-folders.element.js';
import './commandments/program-cs-clean.element.js';
import './commandments/production-settings.element.js';
import './commandments/alias-audit.element.js';
import './commandments/translation-audit.element.js';
import './commandments/root-media.element.js';
import './commandments/views-confession.element.js';
import './commandments/exodus.element.js';
import './commandments/root-content.element.js';
import './commandments/usync-audit.element.js';

interface StatusDetail {
    issueCount: number;
    severity: 'ok' | 'warning' | 'error';
}

// The talk's numbering. III and VI merge several audits: each part reports its own status and the
// tab's badge is their sum.
const TABS = [
    { id: 'I',    label: 'I — Content is not composable', parts: ['I'] },
    { id: 'II',   label: 'II — Four content types', parts: ['II'] },
    { id: 'III',  label: 'III — The root is bare, a folder is only a folder', parts: ['III.data-types', 'III.dictionary', 'III.media'] },
    { id: 'IV',   label: 'IV — Compose in thy IComposer, not Program.cs', parts: ['IV'] },
    { id: 'V',    label: 'V — Production runs in production mode', parts: ['V'] },
    { id: 'VI',   label: 'VI — Thy names', parts: ['VI.aliases', 'VI.keys'] },
    { id: 'VII',  label: 'VII — Views render; they don’t search', parts: ['VII'] },
    { id: 'VIII', label: 'VIII — Umbraco is not thy database', parts: ['VIII'] },
    { id: 'IX',   label: 'IX — A root node is not a rendering node', parts: ['IX'] },
    { id: 'X',    label: 'X — uSync when not on Umbraco Cloud', parts: ['X'] },
] as const;

type TabId = typeof TABS[number]['id'];

const SEVERITY_RANK = { ok: 0, warning: 1, error: 2 } as const;
const ALL_PARTS = TABS.flatMap((t) => t.parts as readonly string[]);

const SPOOKY_LABELS: Record<number, string> = {
    0: 'Righteous — thy backoffice is clean',
    1: 'A whisper of darkness',
    2: 'The shadows stir',
    3: 'Candles flicker and die',
    4: 'The walls bleed slightly',
    5: 'Something ancient awakens',
    6: 'The abyss gazes back',
    7: 'Hell hath taken notice',
    8: 'The damned rejoice',
    9: 'All is lost',
    10: 'THOU ART BEYOND ALL REDEMPTION',
};

@customElement('sinners-penance-dashboard')
export class PenanceDashboardElement extends UmbElementMixin(LitElement) {
    #themeCtx?: typeof UMB_THEME_CONTEXT.TYPE;
    readonly #isDebug = new URLSearchParams(window.location.search).has('debug');

    @state() private _activeTab: TabId = 'I';
    /** Keyed by part ('I', 'III.media', …) */
    @state() private _statuses = new Map<string, StatusDetail>();
    @state() private _spookyFactor = 0;
    #userNavigated = false;

    // Sized for a projector, not a desk: the Board is shown framed in the talk's deck, on a big
    // screen in a big room. The chrome here (title, tally, the row of ten) is set in large type; the
    // commandments' own panes were drawn at a 12–13 px UI size and are scaled up as a whole (zoom on
    // .tab-content), which keeps their proportions and makes their text about 20 px.
    static override styles = css`
        :host {
            display: block;
            padding: 14px 24px 48px;
        }

        .hero {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 24px;
            margin-bottom: 16px;
        }

        .hero h1 {
            font-size: 38px;
            line-height: 1;
            font-weight: 900;
            letter-spacing: 0.01em;
            margin: 0;
        }

        /* the verdict: the one line the room should read */
        .verdict {
            margin: 10px 0 0 0;
            font-size: 24px;
            line-height: 1.1;
            font-style: italic;
            font-weight: 700;
            /* the theme's accent, leaned towards the text colour: on its own it goes dull in the middle levels */
            color: color-mix(in srgb, var(--uui-color-selected-standalone, #3544b1) 55%, var(--uui-color-text, #1b264f));
            letter-spacing: 0.05em;
        }

        /* every sin on the site, counted: it falls as they're absolved */
        .tally {
            display: flex;
            align-items: baseline;
            gap: 12px;
            line-height: 1;
            white-space: nowrap;
        }

        .tally b {
            font-size: 62px;
            font-weight: 900;
            font-variant-numeric: tabular-nums;
            color: var(--uui-color-danger-standalone, #d42054);
        }

        .tally.clean b { color: var(--uui-color-positive-standalone, #0d7a54); }

        .tally span {
            font-size: 20px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: var(--uui-color-text-alt, #8d8d8d);
        }

        /* the ten, in a row: numeral and count. The commandment's name is the heading of its pane */
        .tab-strip {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 8px;
            margin-bottom: 18px;
        }

        .tab-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;
            height: 86px;
            padding: 0;
            border: 2px solid var(--uui-color-border, #d8d7d9);
            border-radius: 10px;
            background: var(--uui-color-surface, #fff);
            cursor: pointer;
            font: inherit;
            color: var(--uui-color-text, #333);
            transition: color 0.15s, border-color 0.15s, background 0.15s, box-shadow 0.15s, transform 0.15s;
        }

        .tab-btn .numeral {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 30px;
            line-height: 1;
            font-weight: 700;
            letter-spacing: 0.06em;
        }

        .tab-btn:hover { border-color: var(--uui-color-border-emphasis, #a1a1a1); }

        .tab-btn.active {
            color: var(--uui-color-selected-contrast, #fff);
            border-color: var(--uui-color-selected-standalone, #3544b1);
            background: var(--uui-color-selected, #3544b1);
            box-shadow: 0 0 22px color-mix(in srgb, var(--uui-color-selected-standalone, #3544b1) 60%, transparent);
            transform: translateY(-2px);
        }

        /* a commandment kept: its tile is ringed in the theme's green */
        .tab-btn.absolved { border-color: var(--uui-color-positive-standalone, #0d7a54); }

        .status-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            height: 30px;
            padding: 0 10px;
            border-radius: 15px;
            font-size: 22px;
            line-height: 1;
            font-weight: 800;
            font-variant-numeric: tabular-nums;
            flex-shrink: 0;
        }

        .status-badge.pending {
            background: var(--uui-color-border-standalone, #e0e0e0);
            width: 40px;
        }

        .status-badge.ok {
            background: var(--uui-color-positive-standalone, #0d7a54);
            color: var(--sinners-on-bright, white);
        }

        .status-badge.warning {
            background: #f0ac00;
            color: #1d0d00;
        }

        .status-badge.error {
            background: var(--uui-color-danger-standalone, #d42054);
            color: var(--sinners-on-bright, white);
        }

        /* on the lit tile the count sits on a dark plate, so it still reads */
        .tab-btn.active .status-badge.error,
        .tab-btn.active .status-badge.warning {
            background: rgba(20, 6, 2, 0.78);
            color: #fff3df;
        }

        .tab-content {
            min-width: 0;
            /* the panes are drawn small (see the top): shown at 1.6×, about 20 px text */
            zoom: 1.6;
            /* each pane's box: its heading is the commandment, so it's set large, and the box's own
               padding is cut (the panes pad themselves) to keep the fix buttons above the fold */
            --uui-type-h5-size: 19px;
            --uui-box-header-padding: 10px 16px;
            --uui-box-default-padding: 4px 6px;
        }

        .debug-strip {
            margin-top: 32px;
            padding: 14px 16px;
            border: 1px dashed var(--uui-color-border-standalone, #ccc);
            border-radius: 4px;
            background: var(--uui-color-surface-alt, #fafafa);
            font-size: 12px;
            color: var(--uui-color-text-alt, #888);
        }

        .debug-strip label {
            display: block;
            font-weight: 700;
            margin-bottom: 4px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-size: 10px;
        }

        .debug-strip .spooky-label {
            font-size: 13px;
            font-style: italic;
            margin-bottom: 8px;
            color: var(--uui-color-text, #333);
        }

        .debug-strip input[type=range] {
            width: 100%;
        }

        .pane {
            flex-direction: column;
            gap: var(--uui-size-space-5, 24px);
        }
    `;

    override connectedCallback() {
        super.connectedCallback();
        // A persisted tab (from before an exhibit round-trip) beats both the default
        // and the first-sinful-tab auto-jump — the talk resumes where it left off.
        const persistedTab = presenter.activeTab;
        if (persistedTab && TABS.some((t) => t.id === persistedTab)) {
            this._activeTab = persistedTab as TabId;
            this.#userNavigated = true;
        }
        presenter.setActiveTab(this._activeTab);
        presenter.onNextTab(this, () => {
            this.#userNavigated = true;
            const ids = TABS.map((t) => t.id);
            const next = ids[(ids.indexOf(this._activeTab) + 1) % ids.length];
            this._activeTab = next;
            presenter.setActiveTab(next);
        });
        this.consumeContext(UMB_THEME_CONTEXT, (ctx) => {
            this.#themeCtx = ctx;
            this.#applyTheme();
        });
        boardMounted();
    }

    /** A tab's status, once every one of its parts has reported. */
    #tabStatus(tab: typeof TABS[number]): StatusDetail | undefined {
        const parts = (tab.parts as readonly string[]).map((p) => this._statuses.get(p));
        if (parts.some((p) => !p)) return undefined;
        const reported = parts as StatusDetail[];
        const issueCount = reported.reduce((sum, p) => sum + p.issueCount, 0);
        const severity = reported
            .filter((p) => p.issueCount > 0)
            .reduce<StatusDetail['severity']>((worst, p) => SEVERITY_RANK[p.severity] > SEVERITY_RANK[worst] ? p.severity : worst, 'ok');
        return { issueCount, severity };
    }

    get #autoLevel(): number {
        // One per sinful commandment, so the max is naturally 10
        return TABS.filter((t) => (this.#tabStatus(t)?.issueCount ?? 0) > 0).length;
    }

    get #effectiveLevel(): number {
        return this._spookyFactor > 0 ? this._spookyFactor : this.#autoLevel;
    }

    #applyTheme() {
        // Not before every part has counted: until then the level is that of the few that have, so a
        // freshly loaded Board went light, then level 1, 2, 3… up to its real one, a flash on every
        // return from an exhibit. The page arrives in the theme it was left in; keep that meanwhile.
        if (this._spookyFactor === 0 && !ALL_PARTS.every((p) => this._statuses.has(p))) return;
        const level = this.#effectiveLevel;
        this.#themeCtx?.setThemeByAlias(level > 0 ? SPOOKY_ALIAS(level) : 'umb-light-theme');
    }

    #onSpookyChange(e: Event) {
        this._spookyFactor = +(e.target as HTMLInputElement).value;
        this.#applyTheme();
    }

    #onStatus(part: string, detail: StatusDetail) {
        this._statuses = new Map(this._statuses).set(part, detail);
        if (this._spookyFactor === 0) this.#applyTheme();
        if (!this.#userNavigated && ALL_PARTS.every((p) => this._statuses.has(p))) {
            this.#userNavigated = true;
            const first = TABS.find((t) => (this.#tabStatus(t)?.issueCount ?? 0) > 0);
            if (first) {
                this._activeTab = first.id;
                presenter.setActiveTab(first.id);
            }
        }
    }

    #renderBadge(tab: typeof TABS[number]) {
        const status = this.#tabStatus(tab);
        if (!status) return html`<span class="status-badge pending"></span>`;
        if (status.issueCount === 0) return html`<span class="status-badge ok">✓</span>`;
        return html`<span class="status-badge ${status.severity}">${status.issueCount}</span>`;
    }

    /** Every sin still on the site, as one big number (once every part has counted). */
    #renderTally() {
        if (!ALL_PARTS.every((p) => this._statuses.has(p))) return nothing;
        const total = [...this._statuses.values()].reduce((sum, s) => sum + s.issueCount, 0);
        return html`<div class="tally ${total === 0 ? 'clean' : ''}"><b>${total}</b><span>${total === 1 ? 'sin' : 'sins'}</span></div>`;
    }

    #pane(tab: TabId, content: unknown) {
        return html`<div class="pane" style="display:${this._activeTab === tab ? 'flex' : 'none'}">${content}</div>`;
    }

    #status(part: string) {
        return (e: CustomEvent<StatusDetail>) => this.#onStatus(part, e.detail);
    }

    override render() {
        return html`
            <div class="hero">
                <div>
                    <h1>Penance Board</h1>
                    ${ALL_PARTS.every((p) => this._statuses.has(p)) ? html`<p class="verdict">${SPOOKY_LABELS[this.#effectiveLevel]}</p>` : nothing}
                </div>
                ${this.#renderTally()}
            </div>

            <div class="tab-strip">
                ${TABS.map((tab) => html`
                    <button
                        class="tab-btn ${this._activeTab === tab.id ? 'active' : ''} ${this.#tabStatus(tab)?.issueCount === 0 ? 'absolved' : ''}"
                        title=${tab.label}
                        @click=${() => { this.#userNavigated = true; this._activeTab = tab.id; presenter.setActiveTab(tab.id); }}>
                        <span class="numeral">${tab.id}</span>
                        ${this.#renderBadge(tab)}
                    </button>
                `)}
            </div>

            <div class="tab-content">
                ${this.#pane('I', html`
                    <sinners-content-not-composable @sinners-status=${this.#status('I')}></sinners-content-not-composable>`)}
                ${this.#pane('II', html`
                    <sinners-four-sacred-types @sinners-status=${this.#status('II')}></sinners-four-sacred-types>`)}
                ${this.#pane('III', html`
                    <sinners-data-types-in-folders @sinners-status=${this.#status('III.data-types')}></sinners-data-types-in-folders>
                    <sinners-translation-audit mode="grouping" @sinners-status=${this.#status('III.dictionary')}></sinners-translation-audit>
                    <sinners-root-media @sinners-status=${this.#status('III.media')}></sinners-root-media>`)}
                ${this.#pane('IV', html`
                    <sinners-program-cs-clean @sinners-status=${this.#status('IV')}></sinners-program-cs-clean>`)}
                ${this.#pane('V', html`
                    <sinners-production-settings @sinners-status=${this.#status('V')}></sinners-production-settings>`)}
                ${this.#pane('VI', html`
                    <sinners-alias-audit @sinners-status=${this.#status('VI.aliases')}></sinners-alias-audit>
                    <sinners-translation-audit mode="naming" @sinners-status=${this.#status('VI.keys')}></sinners-translation-audit>`)}
                ${this.#pane('VII', html`
                    <sinners-views-confession @sinners-status=${this.#status('VII')}></sinners-views-confession>`)}
                ${this.#pane('VIII', html`
                    <sinners-exodus @sinners-status=${this.#status('VIII')}></sinners-exodus>`)}
                ${this.#pane('IX', html`
                    <sinners-root-content @sinners-status=${this.#status('IX')}></sinners-root-content>`)}
                ${this.#pane('X', html`
                    <sinners-usync-audit @sinners-status=${this.#status('X')}></sinners-usync-audit>`)}
            </div>

            ${this.#isDebug ? html`
                <div class="debug-strip">
                    <label>Debug — Spooky Factor Override (auto: ${this.#autoLevel})</label>
                    <div class="spooky-label">${this.#effectiveLevel} — ${SPOOKY_LABELS[this.#effectiveLevel]}</div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        .value=${String(this._spookyFactor)}
                        @input=${this.#onSpookyChange}>
                </div>` : nothing}
        `;
    }
}
