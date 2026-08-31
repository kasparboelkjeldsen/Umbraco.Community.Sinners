import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { presenter, TAB_SHORT, type PresenterAction } from './presenter.js';

export const BAR_WIDTH = 210;

const LAYOUT_STYLE_ID = 'sinners-presenter-bar-layout';

/**
 * Big dumb stage buttons — a fixed bar on the right edge so the talk can be
 * driven by glancing and mashing 1/2/3/4 (or clicking) instead of trusting
 * whatever presenter remote the venue happens to have.
 *
 * Lives on <body> (registered from the entry point), so it survives every
 * navigation the presenter does, including full-page exhibit jumps.
 */
@customElement('sinners-presenter-bar')
export class PresenterBarElement extends LitElement {
    @state() private _flash: 1 | 2 | 3 | 4 | null = null;

    #unsubscribe?: () => void;
    #pathTimer?: number;
    #lastPath = '';
    #flashTimer?: number;

    static override styles = css`
        :host {
            position: fixed;
            top: 0;
            right: 0;
            width: ${BAR_WIDTH}px;
            height: 100vh;
            z-index: 100000;
            display: flex;
            flex-direction: column;
            background: #12061f;
            border-left: 3px solid #d42054;
            font-family: inherit;
        }

        .title {
            padding: 10px 12px 8px;
            text-align: center;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #b98da8;
            border-bottom: 1px solid rgba(212, 32, 84, 0.35);
            user-select: none;
        }

        .title .tab {
            display: block;
            margin-top: 4px;
            font-size: 22px;
            letter-spacing: 0.04em;
            color: #ffffff;
        }

        .btn {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 12px;
            border: none;
            border-bottom: 1px solid rgba(212, 32, 84, 0.35);
            background: transparent;
            color: #fff;
            cursor: pointer;
            text-align: center;
            transition: background 0.1s;
        }

        .btn:last-of-type { border-bottom: none; }
        .btn:hover:not(:disabled) { background: rgba(212, 32, 84, 0.18); }
        .btn:active:not(:disabled) { background: rgba(212, 32, 84, 0.4); }

        .btn:disabled {
            opacity: 0.3;
            cursor: default;
        }

        .btn.flash {
            background: #d42054;
        }

        .num {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 10px;
            border: 2px solid #d42054;
            font-size: 26px;
            font-weight: 900;
            color: #ff5e8a;
            flex-shrink: 0;
        }

        .btn.flash .num {
            background: #fff;
            color: #d42054;
            border-color: #fff;
        }

        .verb {
            font-size: 17px;
            font-weight: 800;
            line-height: 1.2;
        }

        .detail {
            font-size: 13px;
            font-weight: 500;
            line-height: 1.3;
            color: #cdaebf;
            overflow-wrap: anywhere;
        }

        .btn.flash .detail { color: #ffd7e2; }
    `;

    override connectedCallback() {
        super.connectedCallback();
        this.#injectLayoutStyle();
        this.#unsubscribe = presenter.subscribe((action) => this.#onPresenterAction(action));
        window.addEventListener('keydown', this.#onKeyDown, true);
        // The backoffice router pushState()s around without telling anyone — poll the path
        this.#lastPath = window.location.pathname;
        this.#pathTimer = window.setInterval(() => {
            if (window.location.pathname !== this.#lastPath) {
                this.#lastPath = window.location.pathname;
                this.requestUpdate();
            }
        }, 400);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.#unsubscribe?.();
        window.removeEventListener('keydown', this.#onKeyDown, true);
        if (this.#pathTimer) clearInterval(this.#pathTimer);
        document.getElementById(LAYOUT_STYLE_ID)?.remove();
    }

    /** Shove the backoffice over so the bar has its own lane instead of covering content. */
    #injectLayoutStyle() {
        if (document.getElementById(LAYOUT_STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = LAYOUT_STYLE_ID;
        style.textContent = `
            body { width: calc(100vw - ${BAR_WIDTH}px) !important; }
            umb-app { width: calc(100vw - ${BAR_WIDTH}px) !important; }
        `;
        document.head.appendChild(style);
    }

    #onPresenterAction(action: PresenterAction) {
        if (action === 'next') this.#flashButton(1);
        else if (action === 'nextTab') this.#flashButton(2);
        else if (action === 'dot') this.#flashButton(3);
        this.requestUpdate();
    }

    #flashButton(n: 1 | 2 | 3 | 4) {
        this._flash = n;
        if (this.#flashTimer) clearTimeout(this.#flashTimer);
        this.#flashTimer = window.setTimeout(() => { this._flash = null; }, 350);
    }

    // Stage rig: 0-4 belong to the bar EVERYWHERE, even with an input focused
    // (workspaces autofocus their name field, which would otherwise silently eat the
    // keys exactly when presenting blind). preventDefault keeps digits out of fields.
    // The talk script involves no real typing — a venue keyboard beats a venue pointer.
    #onKeyDown = (e: KeyboardEvent) => {
        if (!['1', '2', '3', '4', '0'].includes(e.key)) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.key === '1') void presenter.next();
        else if (e.key === '2') presenter.nextTab();
        else if (e.key === '3') presenter.dot();
        else if (e.key === '4') { this.#flashButton(4); window.location.reload(); }
        else if (e.key === '0') presenter.reset();
    };

    #click(n: 1 | 2 | 3 | 4, e: Event) {
        (e.currentTarget as HTMLElement).blur();
        if (n === 1) void presenter.next();
        else if (n === 2) presenter.nextTab();
        else if (n === 3) presenter.dot();
        else { this.#flashButton(4); window.location.reload(); }
    }

    override render() {
        const tab = presenter.activeTab;
        const step = presenter.stepInfo();
        const onBoard = window.location.pathname.includes('/dashboard/penance');

        // Button 1 — next scripted step
        let stepVerb = 'Do penance';
        let stepDetail = '';
        let stepDisabled = false;
        if (!onBoard || !step) {
            stepDisabled = true;
            stepDetail = onBoard ? 'no steps here' : 'return to the Board first';
        } else if (step.index >= step.total) {
            stepDisabled = true;
            stepVerb = 'Penance done';
            stepDetail = `all ${step.total} steps atoned`;
        } else {
            stepDetail = `${step.label} · ${step.index + 1}/${step.total}`;
        }

        // Button 2 — next commandment
        const nextId = presenter.nextTabId();
        const tabDisabled = !onBoard || !presenter.canNextTab;

        // Button 3 — exhibit / return
        const intent = presenter.dotIntent();
        const dotVerb = intent === 'exhibit' ? 'Exhibit the sin'
            : intent === 'return' ? 'Return to Board'
            : 'Reload the Board';
        const dotDetail = intent === 'exhibit' ? (TAB_SHORT[tab] ?? '') : '';

        return html`
            <div class="title">Penance<span class="tab">${onBoard && tab ? tab : '—'}</span></div>
            <button class="btn ${this._flash === 1 ? 'flash' : ''}" ?disabled=${stepDisabled} @click=${(e: Event) => this.#click(1, e)}>
                <span class="num">1</span>
                <span class="verb">${stepVerb}</span>
                <span class="detail">${stepDetail}</span>
            </button>
            <button class="btn ${this._flash === 2 ? 'flash' : ''}" ?disabled=${tabDisabled} @click=${(e: Event) => this.#click(2, e)}>
                <span class="num">2</span>
                <span class="verb">Next commandment</span>
                <span class="detail">${nextId} — ${TAB_SHORT[nextId] ?? ''}</span>
            </button>
            <button class="btn ${this._flash === 3 ? 'flash' : ''}" @click=${(e: Event) => this.#click(3, e)}>
                <span class="num">3</span>
                <span class="verb">${dotVerb}</span>
                <span class="detail">${dotDetail}</span>
            </button>
            <button class="btn ${this._flash === 4 ? 'flash' : ''}" @click=${(e: Event) => this.#click(4, e)}>
                <span class="num">4</span>
                <span class="verb">Reload</span>
                <span class="detail">when all else fails</span>
            </button>
        `;
    }
}
