import { scriptEnded } from './bridge.js';

type StepFn = () => void | Promise<void>;

export interface PresenterStep {
    label: string;
    run: StepFn;
}

export const TAB_ORDER = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const;

const STORAGE_KEY = 'sinners-presenter-state';
/** Set by the '0' reset: the Board asks the server to forget its pretences (✨) before it counts. */
export const FORGET_PRETENCES_KEY = 'sinners-forget-pretences';

interface PersistedState {
    activeTab: string;
    indices: Record<string, number>;
    /** How many of the tab's exhibits have been shown */
    exhibits?: Record<string, number>;
}

function loadState(): PersistedState {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw) as PersistedState;
    } catch { /* fresh state */ }
    return { activeTab: '', indices: {} };
}

const _persisted = loadState();
// tab → part → registrations. A commandment that merges several audits (III, VI) has one part per
// audit element; its script is the parts' steps in TAB_PARTS order. The backoffice may construct a
// dashboard twice and throw one copy away, so every registration remembers its element and the one
// still on the page wins.
const _steps = new Map<string, Map<string, Array<{ host: Element; steps: PresenterStep[] }>>>();
const _indices = new Map<string, number>(Object.entries(_persisted.indices ?? {}));
const _exhibits = new Map<string, number>(Object.entries(_persisted.exhibits ?? {}));
let _activeTab = _persisted.activeTab;
let _nextTab: Array<{ host: Element; fn: () => void }> = [];
// A clicker press while a step is still running would run that step twice
let _busy = false;

function persist() {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
            activeTab: _activeTab,
            indices: Object.fromEntries(_indices),
            exhibits: Object.fromEntries(_exhibits),
        } satisfies PersistedState));
    } catch { /* storage unavailable — presenter still works, just forgets on reload */ }
}

const PENANCE_URL = '/umbraco/section/settings/dashboard/penance';

/**
 * Where each commandment's sin lives in Umbraco, and where its fix can be seen. A plain URL at
 * position k is shown right before fix step k; `{ url, at: n }` is shown once n fix steps are done,
 * so an exhibit can also be the evidence after a fix. A tab with several sins walks "show it, fix
 * it" per sin: III shows the loose data type, organizes, shows the data types in their folders,
 * shows the flat dictionary, groups it, shows it grouped, shows the media root, pretends.
 */
type Exhibit = string | { url: string; at: number };
const DOCUMENT_TYPES = '/umbraco/section/settings/workspace/document-type-root';
const TAB_EXHIBITS: Partial<Record<string, Exhibit[]>> = {
    'I':    ['/umbraco/section/content/workspace/document/edit/704a66de-b213-44fe-815a-f988c0707bbf/invariant/view/info/modal/umb-modal-workspace/invariant/general/document-type/edit/b871f83c-2395-4894-be0f-5422c1a71e48/tab/content'],
    'II':   [
        '/umbraco/section/settings/workspace/document-type/edit/a95360e8-ff04-40b1-8f46-7aa4b5983096/tab/content',
        // after Auto categorize (its 3rd step): the folders it made, with the types in them
        { url: DOCUMENT_TYPES, at: 3 },
    ],
    'III':  [
        { url: '/umbraco/section/settings/workspace/data-type/edit/b5922818-d8d8-43df-88ed-4582a24c0fa6', at: 0 },
        // after Organize: the data types in their folders, before the dictionary
        { url: '/umbraco/section/settings/workspace/data-type-root', at: 1 },
        { url: '/umbraco/section/translation', at: 1 },
        // after grouping the keys: the dictionary again, grouped, before the media root
        { url: '/umbraco/section/translation', at: 2 },
        { url: '/umbraco/section/media/collection', at: 2 },
    ],
    // The partial reset.ps1 plants: server path "/megaMenu.cshtml", the leading '/' URL-encoded (%2F)
    // and '.' as %dot% (itself encoded, %25dot%25). Without the '/' the backoffice says "not found"
    'VII':  ['/umbraco/section/settings/workspace/partial-view/edit/%2FmegaMenu%25dot%25cshtml'],
    // The "Form submissions" collection the seeder plants (DemoSinSeeder.FormSubmissionsKey)
    'VIII': ['/umbraco/section/content/workspace/document/edit/0d1e5e08-8a2e-4f0e-9d7b-5f0a5b5e0008'],
    'IX':   [
        '/umbraco/section/content',
        // after Seek Root Sanctuary: the content tree with its new, template-less root
        { url: '/umbraco/section/content', at: 1 },
    ],
};

/** Script order of the parts of a merged commandment (others have one part, 'main'). */
const TAB_PARTS: Partial<Record<string, string[]>> = {
    'III': ['data-types', 'dictionary', 'media'],
    'VI':  ['aliases', 'keys'],
};

// Where '.' / next goes from a page that isn't the Board (anything not listed: the Board). Content
// used to go via Settings, which cost IX's evidence an extra press; every return is a full page
// load of the Board's URL, so it goes straight there now.
const ELSEWHERE_RULES: Array<{ match: string; target: string }> = [];

function liveSteps(registrations: Array<{ host: Element; steps: PresenterStep[] }>): PresenterStep[] {
    const live = registrations.filter((r) => r.host.isConnected);
    return (live.length ? live : registrations).at(-1)?.steps ?? [];
}

function stepsFor(tabId: string): PresenterStep[] {
    const parts = _steps.get(tabId);
    if (!parts) return [];
    const order = TAB_PARTS[tabId] ?? [...parts.keys()];
    return order.flatMap((part) => liveSteps(parts.get(part) ?? []));
}

function exhibitsFor(tabId: string): Array<{ url: string; at: number }> {
    return (TAB_EXHIBITS[tabId] ?? []).map((e, k) => (typeof e === 'string' ? { url: e, at: k } : e));
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

    /** Exhibit the active tab's next sin (on the Board), or return to the Board (anywhere else). */
    dot() {
        const path = window.location.pathname;

        if (onBoard()) {
            const exhibits = exhibitsFor(_activeTab);
            const shown = _exhibits.get(_activeTab) ?? 0;
            // Past the last exhibit, '.' shows the last one again
            const url = exhibits.length ? exhibits[Math.min(shown, exhibits.length - 1)].url : PENANCE_URL;
            if (exhibits.length && shown < exhibits.length) {
                _exhibits.set(_activeTab, shown + 1);
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

    /**
     * Register a tab's fix steps. `part` names one audit of a merged commandment (see TAB_PARTS);
     * single-audit commandments leave it out.
     */
    registerSteps(tabId: string, host: Element, steps: PresenterStep[], part = 'main') {
        const parts = _steps.get(tabId) ?? new Map<string, Array<{ host: Element; steps: PresenterStep[] }>>();
        const kept = (parts.get(part) ?? []).filter((r) => r.host !== host && r.host.isConnected);
        parts.set(part, [...kept, { host, steps }]);
        _steps.set(tabId, parts);
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
     * exhibit a sin → return to the Board → its fix step (repeated per exhibit) → the remaining
     * fix steps → next commandment. After the last step of the last commandment it tells the talk's
     * deck the script is over (bridge `end`), so the deck can take the clicker back.
     * Off the Board it always means "return to the Board".
     */
    async forward() {
        if (_busy) return;
        if (!onBoard()) {
            this.dot();
            return;
        }
        // The dashboard hasn't told us which tab it shows yet — don't guess
        if (!_activeTab || !_nextTab.some((r) => r.host.isConnected)) return;

        const steps = stepsFor(_activeTab);
        const idx = Math.min(_indices.get(_activeTab) ?? 0, steps.length);
        const shown = _exhibits.get(_activeTab) ?? 0;

        // The next exhibit comes once its `at` fix steps are done (a plain one: right before step k)
        const exhibits = exhibitsFor(_activeTab);
        if (shown < exhibits.length && exhibits[shown].at <= idx) {
            this.dot();
            return;
        }

        if (idx < steps.length) {
            await this.next();
            return;
        }

        if (_activeTab === TAB_ORDER[TAB_ORDER.length - 1]) {
            console.log('[PRESENTER] forward() — all ten commandments atoned, handing the clicker back');
            scriptEnded();
            return;
        }
        this.nextTab();
    },

    /**
     * Wipe all demo state and reload — the "0" panic reset. Clears presenter progress and
     * exhibited sins here, and has the Board tell the server to forget its pretences (✨).
     */
    reset() {
        try {
            sessionStorage.removeItem(STORAGE_KEY);
            sessionStorage.setItem(FORGET_PRETENCES_KEY, '1');
            localStorage.removeItem('sinners-media-pretend'); // the pretence used to live here
        } catch { /* ignore */ }
        window.location.href = PENANCE_URL;
    },
};
