import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { presenter } from '../presenter.js';
import { showMagic } from '../magic.js';

interface RootMediaItem {
    key: string;
    name: string;
    mediaTypeAlias: string;
    createDate: string;
}

const API_BASE = '/umbraco/management/api/v1/sinners';

@customElement('sinners-root-media')
export class RootMediaElement extends UmbElementMixin(LitElement) {
    #authCtx?: typeof UMB_AUTH_CONTEXT.TYPE;

    @state() private _items: RootMediaItem[] = [];
    @state() private _loading = true;
    @state() private _pretending = localStorage.getItem('sinners-media-pretend') === '1';

    static override styles = css`
        .clean {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .info {
            padding: 10px 16px 4px;
            font-size: 12px;
            color: var(--uui-color-text-alt, #888);
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
        }

        .item-row {
            padding: 10px 16px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .item-row:last-child { border-bottom: none; }
        .item-row:hover { background: var(--uui-color-surface-alt, #fafafa); }

        .item-name {
            flex: 1;
            font-weight: 500;
            font-size: 13px;
        }

        .item-type {
            font-family: monospace;
            font-size: 11px;
            padding: 2px 6px;
            border-radius: 3px;
            background: var(--uui-color-surface-emphasis, #e8e8e8);
            color: var(--uui-color-text-alt, #555);
            white-space: nowrap;
        }

        .item-date {
            font-size: 11px;
            color: var(--uui-color-text-alt, #aaa);
            white-space: nowrap;
        }

        .pretend-btn {
            margin: 12px 16px;
        }
    `;

    override connectedCallback() {
        super.connectedCallback();
        presenter.registerSteps('VIII', [
            { label: 'Pretend to fix ✨', run: () => this.#pretend() },
        ]);
        this.consumeContext(UMB_AUTH_CONTEXT, (ctx) => {
            this.#authCtx = ctx;
            void this.#load();
        });
    }

    async #load() {
        this._loading = true;
        try {
            const token = await this.#authCtx?.getLatestToken();
            const res = await fetch(`${API_BASE}/root-media`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (res.ok) this._items = (await res.json()) as RootMediaItem[];

            const count = this._pretending ? 0 : this._items.length;
            this.dispatchEvent(new CustomEvent('sinners-status', {
                bubbles: true, composed: true,
                detail: { issueCount: count, severity: count > 0 ? 'error' : 'ok' },
            }));
        } finally {
            this._loading = false;
        }
    }

    #pretend() {
        showMagic(() => {
            this._pretending = true;
            localStorage.setItem('sinners-media-pretend', '1');
            this.dispatchEvent(new CustomEvent('sinners-status', {
                bubbles: true, composed: true,
                detail: { issueCount: 0, severity: 'ok' },
            }));
        });
    }

    override render() {
        const items = this._pretending ? [] : this._items;
        return html`
            <uui-box headline="VIII — No media items at root">
                ${this._loading
                    ? html`<uui-loader-bar></uui-loader-bar>`
                    : items.length === 0
                      ? html`<div class="clean">✓ No media items loose at root — everything is in a folder.</div>`
                      : html`
                            <div class="info">
                                ${items.length} media item(s) are sitting directly at root.
                                Move them into a folder.
                            </div>
                            ${items.map((item) => html`
                                <div class="item-row">
                                    <span class="item-name">${item.name}</span>
                                    <span class="item-type">${item.mediaTypeAlias}</span>
                                    <span class="item-date">${new Date(item.createDate).toLocaleDateString()}</span>
                                </div>
                            `)}
                            <uui-button class="pretend-btn" look="secondary" @click=${() => this.#pretend()}>
                                ✨ Let's pretend it's fixed
                            </uui-button>
                        `}
            </uui-box>
        `;
    }
}
