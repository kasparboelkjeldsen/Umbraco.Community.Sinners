type Step = () => void | Promise<void>;

const _steps = new Map<string, Step[]>();
const _indices = new Map<string, number>();
let _activeTab = '';
let _nextTabFn: (() => void) | null = null;

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

export const presenter = {
    setActiveTab(tabId: string) {
        _activeTab = tabId;
    },

    dot() {
        const path = window.location.pathname;
        const onPenance = path.includes('/dashboard/penance');

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

    nextTab() {
        console.log('[PRESENTER] nextTab()');
        _nextTabFn?.();
    },

    registerSteps(tabId: string, steps: Step[]) {
        _steps.set(tabId, steps);
        _indices.set(tabId, 0);
    },

    async next() {
        const steps = _steps.get(_activeTab) ?? [];
        const idx = _indices.get(_activeTab) ?? 0;
        console.log(`[PRESENTER] next() — tab="${_activeTab}" step=${idx + 1}/${steps.length}`);
        if (idx >= steps.length) {
            console.log(`[PRESENTER] no more steps on tab "${_activeTab}"`);
            return;
        }
        await steps[idx]();
        _indices.set(_activeTab, idx + 1);
        console.log(`[PRESENTER] step ${idx + 1} done`);
    },
};
