type StepFn = () => void | Promise<void>;

export interface PresenterStep {
    label: string;
    run: StepFn;
}

export const TAB_ORDER = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const;

const STORAGE_KEY = 'sinners-presenter-state';

interface PersistedState {
    activeTab: string;
    indices: Record<string, number>;
    exhibited?: string[];
}

function loadState(): PersistedState {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw) as PersistedState;
    } catch { /* fresh state */ }
    return { activeTab: '', indices: {} };
}

const _persisted = loadState();
// The backoffice may construct a dashboard twice and throw one copy away, so every
// registration remembers its element and the one still on the page wins.
const _steps = new Map<string, Array<{ host: Element; steps: PresenterStep[] }>>();
const _indices = new Map<string, number>(Object.entries(_persisted.indices));
// Tabs whose sin has already been exhibited — the clicker shows each one once
const _exhibited = new Set<string>(_persisted.exhibited ?? []);
let _activeTab = _persisted.activeTab;
let _nextTab: Array<{ host: Element; fn: () => void }> = [];
// A clicker press while a step is still running would run that step twice
let _busy = false;

function persist() {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
            activeTab: _activeTab,
            indices: Object.fromEntries(_indices),
            exhibited: [..._exhibited],
        } satisfies PersistedState));
    } catch { /* storage unavailable — presenter still works, just forgets on reload */ }
}

const PENANCE_URL = '/umbraco/section/settings/dashboard/penance';

const TAB_URLS: Partial<Record<string, string>> = {
    'I':    '/umbraco/section/content/workspace/document/edit/704a66de-b213-44fe-815a-f988c0707bbf/invariant/view/info/modal/umb-modal-workspace/invariant/general/document-type/edit/b871f83c-2395-4894-be0f-5422c1a71e48/tab/content',
    'II':   '/umbraco/section/settings/workspace/document-type/edit/a95360e8-ff04-40b1-8f46-7aa4b5983096/tab/content',
    'III':  '/umbraco/section/settings/workspace/data-type/edit/b5922818-d8d8-43df-88ed-4582a24c0fa6',
    'VII':  '/umbraco/section/translation',
    'VIII': '/umbraco/section/media/collection',
    'IX':   '/umbraco/section/content',
};

const ELSEWHERE_RULES: Array<{ match: string; target: string }> = [
    { match: '/umbraco/section/content', target: '/umbraco/section/settings' },
];

function stepsFor(tabId: string): PresenterStep[] {
    const all = _steps.get(tabId) ?? [];
    const live = all.filter((r) => r.host.isConnected);
    return (live.length ? live : all).at(-1)?.steps ?? [];
}

function onBoard(): boolean {
    return window.location.pathname.includes('/dashboard/penance');
}

export const presenter = {
    get activeTab(): string {
        return _activeTab;
    },

    setActiveTab(tabId: string) {
        _activeTab = tabId;
        persist();
    },

    /** Exhibit the active tab's sin (on the Board), or return to the Board (anywhere else). */
    dot() {
        const path = window.location.pathname;

        if (onBoard()) {
            const url = TAB_URLS[_activeTab] ?? PENANCE_URL;
            if (TAB_URLS[_activeTab]) {
                _exhibited.add(_activeTab);
                persist();
            }
            console.log(`[PRESENTER] dot() on penance tab="${_activeTab}" → ${url}`);
            window.location.href = url;
            return;
        }

        const rule = ELSEWHERE_RULES.find((r) => path === r.match);
        const target = rule ? rule.target : PENANCE_URL;
        console.log(`[PRESENTER] dot() elsewhere path="${path}" → ${target}`);
        window.location.href = target;
    },

    onNextTab(host: Element, fn: () => void) {
        _nextTab = [..._nextTab.filter((r) => r.host !== host && r.host.isConnected), { host, fn }];
    },

    nextTab() {
        console.log('[PRESENTER] nextTab()');
        const live = _nextTab.filter((r) => r.host.isConnected);
        (live.length ? live : _nextTab).at(-1)?.fn();
    },

    registerSteps(tabId: string, host: Element, steps: PresenterStep[]) {
        const kept = (_steps.get(tabId) ?? []).filter((r) => r.host !== host && r.host.isConnected);
        _steps.set(tabId, [...kept, { host, steps }]);
        // Restore a persisted index (survives exhibit round-trips) but never point past the end
        const stored = _indices.get(tabId) ?? 0;
        _indices.set(tabId, Math.min(stored, steps.length));
    },

    async next() {
        if (_busy) return;
        const steps = stepsFor(_activeTab);
        const idx = _indices.get(_activeTab) ?? 0;
        console.log(`[PRESENTER] next() — tab="${_activeTab}" step=${idx + 1}/${steps.length}`);
        if (idx >= steps.length) {
            console.log(`[PRESENTER] no more steps on tab "${_activeTab}"`);
            return;
        }
        _busy = true;
        try {
            await steps[idx].run();
        } finally {
            _busy = false;
        }
        _indices.set(_activeTab, idx + 1);
        persist();
        console.log(`[PRESENTER] step ${idx + 1} "${steps[idx].label}" done`);
    },

    /**
     * The clicker's "next": one press, one beat of the demo. Per commandment it walks
     * exhibit the sin → return to the Board → each fix step → next commandment, and
     * stops after the last step of the last commandment. Off the Board it always
     * means "return to the Board".
     */
    async forward() {
        if (_busy) return;
        if (!onBoard()) {
            this.dot();
            return;
        }
        // The dashboard hasn't told us which tab it shows yet — don't guess
        if (!_activeTab || !_nextTab.some((r) => r.host.isConnected)) return;

        if (TAB_URLS[_activeTab] && !_exhibited.has(_activeTab)) {
            this.dot();
            return;
        }

        const steps = stepsFor(_activeTab);
        if ((_indices.get(_activeTab) ?? 0) < steps.length) {
            await this.next();
            return;
        }

        if (_activeTab === TAB_ORDER[TAB_ORDER.length - 1]) {
            console.log('[PRESENTER] forward() — all ten commandments atoned, nothing left');
            return;
        }
        this.nextTab();
    },

    /**
     * Wipe all demo state and reload — the "0" panic reset. Clears presenter
     * progress, exhibited sins and the Rule VIII pretend flag.
     */
    reset() {
        try {
            sessionStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem('sinners-media-pretend');
        } catch { /* ignore */ }
        window.location.href = PENANCE_URL;
    },
};
