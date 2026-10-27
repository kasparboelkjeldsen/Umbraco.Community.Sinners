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

    static override styles = css`
        :host {
            display: block;
            padding: var(--uui-size-space-5, 24px);
            max-width: 1200px;
        }

        .hero {
            margin-bottom: var(--uui-size-space-5, 24px);
        }

        .hero h1 {
            font-size: 2rem;
            font-weight: 700;
            margin: 0 0 var(--uui-size-space-2, 8px) 0;
        }

        .hero p {
            margin: 0;
            color: var(--uui-color-text-alt, #8d8d8d);
        }

        .verdict {
            margin: 8px 0 0 0;
            font-size: 12px;
            font-style: italic;
            color: var(--uui-color-text-alt, #8d8d8d);
            letter-spacing: 0.02em;
        }

        .layout {
            display: flex;
            gap: 0;
            align-items: flex-start;
        }

        .tab-strip {
            display: flex;
            flex-direction: column;
            width: 260px;
            flex-shrink: 0;
            border-right: 2px solid var(--uui-color-border, #d8d7d9);
        }

        .tab-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding: 12px 16px;
            border: none;
            border-left: 3px solid transparent;
            background: none;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            color: var(--uui-color-text-alt, #888);
            text-align: left;
            transition: color 0.12s, border-color 0.12s, background 0.12s;
        }

        .tab-btn:hover {
            background: var(--uui-color-surface-alt, #fafafa);
            color: var(--uui-color-text, #333);
        }

        .tab-btn.active {
            color: var(--uui-color-interactive, #1b264f);
            border-left-color: var(--uui-color-selected, #3544b1);
            background: var(--uui-color-surface-alt, #fafafa);
            font-weight: 600;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 20px;
            height: 20px;
            padding: 0 5px;
            border-radius: 10px;
            font-size: 11px;
            font-weight: 700;
            flex-shrink: 0;
        }

        .status-badge.pending {
            background: var(--uui-color-border-standalone, #e0e0e0);
            width: 20px;
        }

        .status-badge.ok {
            background: var(--uui-color-positive-standalone, #0d7a54);
            color: white;
        }

        .status-badge.warning {
            background: #f0ac00;
            color: white;
        }

        .status-badge.error {
            background: var(--uui-color-danger-standalone, #d42054);
            color: white;
        }

        .tab-content {
            flex: 1;
            min-width: 0;
            padding-left: 24px;
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

    #pane(tab: TabId, content: unknown) {
        return html`<div class="pane" style="display:${this._activeTab === tab ? 'flex' : 'none'}">${content}</div>`;
    }

    #status(part: string) {
        return (e: CustomEvent<StatusDetail>) => this.#onStatus(part, e.detail);
    }

    override render() {
        return html`
            <div class="hero">
                <h1>Penance Board</h1>
                <p>Confess your sins. Audit your Umbraco installation against the Ten UmbraCommandments.</p>
                ${this._statuses.size > 0 ? html`<p class="verdict">${SPOOKY_LABELS[this.#effectiveLevel]}</p>` : nothing}
            </div>

            <div class="layout">
            <div class="tab-strip">
                ${TABS.map((tab) => html`
                    <button
                        class="tab-btn ${this._activeTab === tab.id ? 'active' : ''}"
                        @click=${() => { this.#userNavigated = true; this._activeTab = tab.id; presenter.setActiveTab(tab.id); }}>
                        ${tab.label}
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
