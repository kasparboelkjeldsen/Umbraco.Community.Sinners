import type { ManifestTheme } from '@umbraco-cms/backoffice/themes';

function hexLerp(a: string, b: string, t: number): string {
    if (a.length !== 7 || b.length !== 7) return a; // skip alpha variants
    const ar = parseInt(a.slice(1, 3), 16);
    const ag = parseInt(a.slice(3, 5), 16);
    const ab = parseInt(a.slice(5, 7), 16);
    const br = parseInt(b.slice(1, 3), 16);
    const bg = parseInt(b.slice(3, 5), 16);
    const bb = parseInt(b.slice(5, 7), 16);
    const r = Math.round(ar + (br - ar) * t).toString(16).padStart(2, '0');
    const g = Math.round(ag + (bg - ag) * t).toString(16).padStart(2, '0');
    const bl = Math.round(ab + (bb - ab) * t).toString(16).padStart(2, '0');
    return `#${r}${g}${bl}`;
}

// level 1 = Umbraco's own dark theme
const L1: Record<string, string> = {
    '--uui-color-selected':                  '#316dca',
    '--uui-color-selected-emphasis':         '#3e79d0',
    '--uui-color-selected-standalone':       '#5b8dd7',
    '--uui-color-selected-contrast':         '#eeeeef',
    '--uui-color-current':                   '#316dca',
    '--uui-color-current-emphasis':          '#3e79d0',
    '--uui-color-current-standalone':        '#5b8dd7',
    '--uui-color-current-contrast':          '#eeeeef',
    '--uui-color-disabled':                  '#434c56',
    '--uui-color-disabled-standalone':       '#545d68',
    '--uui-color-disabled-contrast':         '#fcfcfc4d',
    '--uui-color-header-surface':            '#21262e',
    '--uui-color-header-contrast':           '#eeeeef',
    '--uui-color-header-contrast-emphasis':  '#eeeeef',
    '--uui-color-focus':                     '#316dca',
    '--uui-color-surface':                   '#2d333b',
    '--uui-color-surface-alt':               '#373e47',
    '--uui-color-surface-emphasis':          '#333a42',
    '--uui-color-background':                '#21262e',
    '--uui-color-text':                      '#eeeeef',
    '--uui-color-text-alt':                  '#eeeeef',
    '--uui-color-interactive':               '#eeeeef',
    '--uui-color-interactive-emphasis':      '#eeeeef',
    '--uui-color-border':                    '#434c56',
    '--uui-color-border-standalone':         '#545d68',
    '--uui-color-border-emphasis':           '#626e7b',
    '--uui-color-divider':                   '#373e47',
    '--uui-color-divider-standalone':        '#434c56',
    '--uui-color-divider-emphasis':          '#545d68',
    '--uui-color-default':                   '#316dca',
    '--uui-color-default-emphasis':          '#5387d5',
    '--uui-color-default-standalone':        '#eeeeef',
    '--uui-color-default-contrast':          '#eeeeef',
    '--uui-color-warning':                   '#af7c12',
    '--uui-color-warning-emphasis':          '#af7c12',
    '--uui-color-warning-standalone':        '#af7c12',
    '--uui-color-warning-contrast':          '#eeeeef',
    '--uui-color-danger':                    '#ca3b37',
    '--uui-color-danger-emphasis':           '#ca3b37',
    '--uui-color-danger-standalone':         '#ca3b37',
    '--uui-color-danger-contrast':           '#eeeeef',
    '--uui-color-positive':                  '#347d39',
    '--uui-color-positive-emphasis':         '#347d39',
    '--uui-color-positive-standalone':       '#347d39',
    '--uui-color-positive-contrast':         '#eeeeef',
};

// level 10 = hellish blood-red
const L10: Record<string, string> = {
    '--uui-color-selected':                  '#8b1a1a',
    '--uui-color-selected-emphasis':         '#a52020',
    '--uui-color-selected-standalone':       '#c84040',
    '--uui-color-selected-contrast':         '#f0e8e8',
    '--uui-color-current':                   '#8b1a1a',
    '--uui-color-current-emphasis':          '#a52020',
    '--uui-color-current-standalone':        '#c84040',
    '--uui-color-current-contrast':          '#f0e8e8',
    '--uui-color-disabled':                  '#2e1a1a',
    '--uui-color-disabled-standalone':       '#3e2a2a',
    '--uui-color-disabled-contrast':         '#fcfcfc4d',
    '--uui-color-header-surface':            '#0d0606',
    '--uui-color-header-contrast':           '#c8b8b8',
    '--uui-color-header-contrast-emphasis':  '#e8d8d8',
    '--uui-color-focus':                     '#8b1a1a',
    '--uui-color-surface':                   '#1c0c0c',
    '--uui-color-surface-alt':               '#251414',
    '--uui-color-surface-emphasis':          '#200f0f',
    '--uui-color-background':                '#110808',
    '--uui-color-text':                      '#e0d0d0',
    '--uui-color-text-alt':                  '#a89090',
    '--uui-color-interactive':               '#e0d0d0',
    '--uui-color-interactive-emphasis':      '#f0e0e0',
    '--uui-color-border':                    '#3a1a1a',
    '--uui-color-border-standalone':         '#4e2828',
    '--uui-color-border-emphasis':           '#623a3a',
    '--uui-color-divider':                   '#1e1010',
    '--uui-color-divider-standalone':        '#3a1a1a',
    '--uui-color-divider-emphasis':          '#4e2828',
    '--uui-color-default':                   '#8b1a1a',
    '--uui-color-default-emphasis':          '#a02020',
    '--uui-color-default-standalone':        '#e0d0d0',
    '--uui-color-default-contrast':          '#f0e0e0',
    '--uui-color-warning':                   '#8f5000',
    '--uui-color-warning-emphasis':          '#a06000',
    '--uui-color-warning-standalone':        '#c07000',
    '--uui-color-warning-contrast':          '#f0e0e0',
    '--uui-color-danger':                    '#cc1a1a',
    '--uui-color-danger-emphasis':           '#dd2222',
    '--uui-color-danger-standalone':         '#ee4444',
    '--uui-color-danger-contrast':           '#f0e0e0',
    '--uui-color-positive':                  '#1a5220',
    '--uui-color-positive-emphasis':         '#1f6226',
    '--uui-color-positive-standalone':       '#2d8c36',
    '--uui-color-positive-contrast':         '#f0e0e0',
};

function buildCss(level: number): string {
    const t = (level - 1) / 9; // 0 at level 1, 1 at level 10
    const lines = Object.keys(L1).map(
        (key) => `    ${key}: ${hexLerp(L1[key], L10[key], t)};`
    );
    lines.push('    --uui-color-scheme: dark;');
    lines.push('    --sinners-action-btn-bg: #e64241;');
    lines.push('    --sinners-action-btn-color: #ffffff;');
    return `:root {\n${lines.join('\n')}\n}`;
}

export const SPOOKY_ALIAS = (level: number) => `sinners-spooky-${level}`;

export function registerSpookyThemes(extensionRegistry: { register: (m: ManifestTheme) => void }): void {
    for (let level = 1; level <= 10; level++) {
        const css = buildCss(level);
        extensionRegistry.register({
            type: 'theme',
            alias: SPOOKY_ALIAS(level),
            name: `☠ Sinners: Abyss (Level ${level})`,
            css: () => Promise.resolve({ default: css }),
            weight: 50 - level,
        });
    }
}
