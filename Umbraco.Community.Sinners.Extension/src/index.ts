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

// Presentation clicker: next walks the whole demo, back is swallowed so a misclick
// can't hurt, '.' (the blank button) exhibits the sin / returns to the Board.
const CLICKER_NEXT = new Set(['PageDown', 'ArrowRight']);
const CLICKER_SWALLOW = new Set(['PageUp', 'ArrowLeft', 'Escape']);

// Fallback for when the clicker dies and the presenter walks over to the laptop:
// 1 = next fix step, 2 = next commandment, 3 = exhibit/return, 4 = reload, 0 = full reset.
const NUMBER_KEYS = new Set(['1', '2', '3', '4', '0']);

// Captured globally, even with an input focused: workspaces autofocus their name
// field, which would otherwise silently eat the keys exactly when presenting blind.
// The talk script involves no typing.
function listenForClicker() {
    window.addEventListener('keydown', (e) => {
        if (!CLICKER_NEXT.has(e.key) && !CLICKER_SWALLOW.has(e.key) && e.key !== '.' && !NUMBER_KEYS.has(e.key)) return;
        e.preventDefault();
        e.stopPropagation();
        // A held key auto-repeats — one press is one beat
        if (e.repeat) return;
        console.log(`[CLICKER] key="${e.key}"`);

        if (CLICKER_NEXT.has(e.key)) void presenter.forward();
        else if (e.key === '.' || e.key === '3') presenter.dot();
        else if (e.key === '1') void presenter.next();
        else if (e.key === '2') presenter.nextTab();
        else if (e.key === '4') window.location.reload();
        else if (e.key === '0') presenter.reset();
    }, true);
}

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
    extensionRegistry.registerMany(manifests);
    registerSpookyThemes(extensionRegistry);
    listenForClicker();
};
