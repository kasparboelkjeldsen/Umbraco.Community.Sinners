import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UMB_THEME_CONTEXT } from '@umbraco-cms/backoffice/themes';
import { SPOOKY_ALIAS } from './spooky-themes.js';
import { presenter } from './presenter.js';
import './commandments/content-not-composable.element.js';
import './commandments/six-sacred-types.element.js';
import './commandments/data-types-in-folders.element.js';
import './commandments/program-cs-clean.element.js';
import './commandments/production-settings.element.js';
import './commandments/alias-audit.element.js';
import './commandments/translation-audit.element.js';
import './commandments/root-media.element.js';
import './commandments/root-content.element.js';
import './commandments/usync-audit.element.js';

interface StatusDetail {
    issueCount: number;
    severity: 'ok' | 'warning' | 'error';
}

const TABS = [
    { id: 'I',   label: 'I — Content is not composable' },
    { id: 'II',  label: 'II — The Six Sacred Types' },
    { id: 'III', label: 'III — Data types live in folders' },
    { id: 'IV',  label: 'IV — Program.cs is clean' },
    { id: 'V',   label: 'V — Live environment is production-ready' },
    { id: 'VI',  label: 'VI — Aliases are camelCase English' },
    { id: 'VII', label: 'VII — Translation keys are PascalCase' },
    { id: 'VIII', label: 'VIII — No media items at root' },
    { id: 'IX',   label: 'IX — Root nodes are Repositories' },
    { id: 'X',    label: 'X — uSync is installed' },
] as const;

type TabId = typeof TABS[number]['id'];

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
    @state() private _statuses = new Map<TabId, StatusDetail>();
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
    `;

    override connectedCallback() {
        super.connectedCallback();
        presenter.setActiveTab(this._activeTab);
        presenter.onNextTab(() => {
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
    }

    get #autoLevel(): number {
        let sinful = 0;
        this._statuses.forEach((s) => { if (s.issueCount > 0) sinful++; });
        return sinful; // max is naturally 10 (one per commandment)
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

    #onStatus(tab: TabId, detail: StatusDetail) {
        this._statuses = new Map(this._statuses).set(tab, detail);
        if (this._spookyFactor === 0) this.#applyTheme();
        if (!this.#userNavigated && this._statuses.size === TABS.length) {
            this.#userNavigated = true;
            const first = TABS.find((t) => (this._statuses.get(t.id)?.issueCount ?? 0) > 0);
            if (first) {
                this._activeTab = first.id;
                presenter.setActiveTab(first.id);
            }
        }
    }

    #renderBadge(tab: TabId) {
        const status = this._statuses.get(tab);
        if (!status) return html`<span class="status-badge pending"></span>`;
        if (status.issueCount === 0) return html`<span class="status-badge ok">✓</span>`;
        return html`<span class="status-badge ${status.severity}">${status.issueCount}</span>`;
    }

    override render() {
        return html`
            <div class="hero">
                <h1>Penance Board</h1>
                <p>Confess your sins. Audit your Umbraco installation against the Ten UmbraCommandments.</p>
                ${this._statuses.size > 0 ? html`<p class="verdict">${SPOOKY_LABELS[this.#effectiveLevel]}</p>` : ''}
            </div>

            <div class="layout">
            <div class="tab-strip">
                ${TABS.map((tab) => html`
                    <button
                        class="tab-btn ${this._activeTab === tab.id ? 'active' : ''}"
                        @click=${() => { this.#userNavigated = true; this._activeTab = tab.id; presenter.setActiveTab(tab.id); }}>
                        ${tab.label}
                        ${this.#renderBadge(tab.id)}
                    </button>
                `)}
            </div>

            <div class="tab-content">
                <div style="display:${this._activeTab === 'I' ? 'block' : 'none'}">
                    <sinners-content-not-composable
                        @sinners-status=${(e: CustomEvent<StatusDetail>) => this.#onStatus('I', e.detail)}>
                    </sinners-content-not-composable>
                </div>
                <div style="display:${this._activeTab === 'II' ? 'block' : 'none'}">
                    <sinners-six-sacred-types
                        @sinners-status=${(e: CustomEvent<StatusDetail>) => this.#onStatus('II', e.detail)}>
                    </sinners-six-sacred-types>
                </div>
                <div style="display:${this._activeTab === 'III' ? 'block' : 'none'}">
                    <sinners-data-types-in-folders
                        @sinners-status=${(e: CustomEvent<StatusDetail>) => this.#onStatus('III', e.detail)}>
                    </sinners-data-types-in-folders>
                </div>
                <div style="display:${this._activeTab === 'IV' ? 'block' : 'none'}">
                    <sinners-program-cs-clean
                        @sinners-status=${(e: CustomEvent<StatusDetail>) => this.#onStatus('IV', e.detail)}>
                    </sinners-program-cs-clean>
                </div>
                <div style="display:${this._activeTab === 'V' ? 'block' : 'none'}">
                    <sinners-production-settings
                        @sinners-status=${(e: CustomEvent<StatusDetail>) => this.#onStatus('V', e.detail)}>
                    </sinners-production-settings>
                </div>
                <div style="display:${this._activeTab === 'VI' ? 'block' : 'none'}">
                    <sinners-alias-audit
                        @sinners-status=${(e: CustomEvent<StatusDetail>) => this.#onStatus('VI', e.detail)}>
                    </sinners-alias-audit>
                </div>
                <div style="display:${this._activeTab === 'VII' ? 'block' : 'none'}">
                    <sinners-translation-audit
                        @sinners-status=${(e: CustomEvent<StatusDetail>) => this.#onStatus('VII', e.detail)}>
                    </sinners-translation-audit>
                </div>
                <div style="display:${this._activeTab === 'VIII' ? 'block' : 'none'}">
                    <sinners-root-media
                        @sinners-status=${(e: CustomEvent<StatusDetail>) => this.#onStatus('VIII', e.detail)}>
                    </sinners-root-media>
                </div>
                <div style="display:${this._activeTab === 'IX' ? 'block' : 'none'}">
                    <sinners-root-content
                        @sinners-status=${(e: CustomEvent<StatusDetail>) => this.#onStatus('IX', e.detail)}>
                    </sinners-root-content>
                </div>
                <div style="display:${this._activeTab === 'X' ? 'block' : 'none'}">
                    <sinners-usync-audit
                        @sinners-status=${(e: CustomEvent<StatusDetail>) => this.#onStatus('X', e.detail)}>
                    </sinners-usync-audit>
                </div>
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
                </div>` : ''}
        `;
    }
}
