type StepFn = () => void | Promise<void>;

export interface PresenterStep {
    label: string;
    run: StepFn;
}

export type PresenterAction = 'next' | 'nextTab' | 'dot' | 'state';

export const TAB_ORDER = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const;

export const TAB_SHORT: Record<string, string> = {
    I: 'Compositions',
    II: 'Sacred Types',
    III: 'Data Types',
    IV: 'Program.cs',
    V: 'Production',
    VI: 'Aliases',
    VII: 'Translations',
    VIII: 'Media',
    IX: 'Root',
    X: 'uSync',
};

const STORAGE_KEY = 'sinners-presenter-state';

interface PersistedState {
    activeTab: string;
    indices: Record<string, number>;
}

function loadState(): PersistedState {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw) as PersistedState;
    } catch { /* fresh state */ }
    return { activeTab: '', indices: {} };
}

const _persisted = loadState();
const _steps = new Map<string, PresenterStep[]>();
const _indices = new Map<string, number>(Object.entries(_persisted.indices));
let _activeTab = _persisted.activeTab;
let _nextTabFn: (() => void) | null = null;
const _listeners = new Set<(action: PresenterAction) => void>();

function persist() {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
            activeTab: _activeTab,
            indices: Object.fromEntries(_indices),
        } satisfies PersistedState));
    } catch { /* storage unavailable — presenter still works, just forgets on reload */ }
}

function notify(action: PresenterAction) {
    _listeners.forEach((fn) => fn(action));
}

const PENANCE_URL = '/umbraco/section/settings/dashboard/penance';

// The bar starts hidden — the first view of Umbraco is completely vanilla.
// It is summoned by speaking the forbidden name ("Sitecore") or pressing 5.
const BAR_VISIBLE_KEY = 'sinners-bar-visible';
let _barVisible = (() => {
    try { return sessionStorage.getItem(BAR_VISIBLE_KEY) === '1'; } catch { return false; }
})();

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

export const presenter = {
    get activeTab(): string {
        return _activeTab;
    },

    get barVisible(): boolean {
        return _barVisible;
    },

    /** Returns the new visibility. */
    toggleBar(): boolean {
        _barVisible = !_barVisible;
        try { sessionStorage.setItem(BAR_VISIBLE_KEY, _barVisible ? '1' : '0'); } catch { /* fine */ }
        notify('state');
        return _barVisible;
    },

    setActiveTab(tabId: string) {
        _activeTab = tabId;
        persist();
        notify('state');
    },

    subscribe(fn: (action: PresenterAction) => void): () => void {
        _listeners.add(fn);
        return () => _listeners.delete(fn);
    },

    /** Info about the pending step on the active tab, or null when no steps are registered (e.g. away from the board). */
    stepInfo(): { label: string; index: number; total: number } | null {
        const steps = _steps.get(_activeTab);
        if (!steps || steps.length === 0) return null;
        const idx = _indices.get(_activeTab) ?? 0;
        if (idx >= steps.length) return { label: '', index: idx, total: steps.length };
        return { label: steps[idx].label, index: idx, total: steps.length };
    },

    nextTabId(): string {
        const ids = TAB_ORDER as readonly string[];
        const idx = ids.indexOf(_activeTab);
        return ids[(idx + 1) % ids.length];
    },

    /** What dot() will do from the current location. */
    dotIntent(): 'exhibit' | 'board-reload' | 'return' {
        if (window.location.pathname.includes('/dashboard/penance'))
            return TAB_URLS[_activeTab] ? 'exhibit' : 'board-reload';
        return 'return';
    },

    dot() {
        const path = window.location.pathname;
        const onPenance = path.includes('/dashboard/penance');
        notify('dot');

        if (onPenance) {
            const url = TAB_URLS[_activeTab] ?? PENANCE_URL;
            console.log(`[PRESENTER] dot() on penance tab="${_activeTab}" → ${url}`);
            window.location.href = url;
            return;
        }

        const rule = ELSEWHERE_RULES.find((r) => path === r.match);
        const target = rule ? rule.target : PENANCE_URL;
        console.log(`[PRESENTER] dot() elsewhere path="${path}" → ${target}`);
        window.location.href = target;
    },

    onNextTab(fn: () => void) {
        _nextTabFn = fn;
    },

    get canNextTab(): boolean {
        return _nextTabFn !== null;
    },

    nextTab() {
        console.log('[PRESENTER] nextTab()');
        _nextTabFn?.();
        notify('nextTab');
    },

    registerSteps(tabId: string, steps: PresenterStep[]) {
        _steps.set(tabId, steps);
        // Restore a persisted index (survives exhibit round-trips) but never point past the end
        const stored = _indices.get(tabId) ?? 0;
        _indices.set(tabId, Math.min(stored, steps.length));
        notify('state');
    },

    async next() {
        const steps = _steps.get(_activeTab) ?? [];
        const idx = _indices.get(_activeTab) ?? 0;
        console.log(`[PRESENTER] next() — tab="${_activeTab}" step=${idx + 1}/${steps.length}`);
        notify('next');
        if (idx >= steps.length) {
            console.log(`[PRESENTER] no more steps on tab "${_activeTab}"`);
            return;
        }
        await steps[idx].run();
        _indices.set(_activeTab, idx + 1);
        persist();
        notify('state');
        console.log(`[PRESENTER] step ${idx + 1} done`);
    },

    /** Wipe persisted presenter state and reload — the "0" panic reset. */
    reset() {
        try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
        window.location.href = PENANCE_URL;
    },
};
