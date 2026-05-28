import type { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import type { ManifestDashboard } from '@umbraco-cms/backoffice/dashboard';
import { PenanceDashboardElement } from './penance/penance-dashboard.element.js';
import { registerSpookyThemes } from './penance/spooky-themes.js';
import { presenter } from './penance/presenter.js';

const ZALGO_ABOVE = [
    '̀', '́', '̂', '̃', '̅', '̈',
    '̊', '̋', '̌', '̓', '̽', '͂',
    '͊', '͋', 'ͣ', 'ͤ', 'ͦ', 'ͬ', 'ͯ',
];
const ZALGO_BELOW = [
    '̖', '̗', '̘', '̜', '̝', '̣',
    '̤', '̥', '̦', '̩', '̬', '̮',
    '̰', '̲', '̳', '͇', '͈', '͓', '͚',
];

function zalgo(text: string): string {
    return [...text]
        .map((char, i) => {
            if (char === ' ') return char;
            const seed = i * 7 + char.charCodeAt(0) * 13;
            const count = 3 + (seed % 3);
            let out = char;
            for (let j = 0; j < count; j++) {
                out += ZALGO_ABOVE[(seed + j * 3) % ZALGO_ABOVE.length];
                out += ZALGO_BELOW[(seed + j * 5 + 2) % ZALGO_BELOW.length];
            }
            return out;
        })
        .join('');
}

const manifests: ManifestDashboard[] = [
    {
        type: 'dashboard',
        alias: 'Sinners.PenanceDashboard',
        name: 'Penance',
        element: PenanceDashboardElement,
        weight: 100,
        meta: {
            label: zalgo('Penance'),
            pathname: 'penance',
        },
        conditions: [
            {
                alias: 'Umb.Condition.SectionAlias',
                match: 'Umb.Section.Settings',
            },
        ],
    },
];

const POINTER_KEYS = new Set(['PageUp', 'PageDown', 'Escape', '.']);

function listenForPointer() {
    window.addEventListener('keydown', (e) => {
        if (!POINTER_KEYS.has(e.key)) return;
        e.preventDefault();
        e.stopPropagation();
        console.log(`[POINTER] key="${e.key}"`);

        if (e.key === 'PageDown') void presenter.next();
        if (e.key === 'PageUp') presenter.nextTab();
        if (e.key === '.') presenter.dot();
        // Escape — reserved
    }, true);
}

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
    extensionRegistry.registerMany(manifests);
    registerSpookyThemes(extensionRegistry);
    listenForPointer();
};
