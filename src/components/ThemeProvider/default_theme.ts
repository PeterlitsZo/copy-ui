import type { Theme } from "./ThemeProvider";

const colors: Theme['colors'] = {
  gray: {
    '000': '#f8f9fa',
    '100': '#f1f3f5',
    '200': '#e9ecef',
    '300': '#dee2e6',
    '400': '#ced4da',
    '500': '#adb5bd',
    '600': '#868e96',
    '700': '#495057',
    '800': '#343a40',
    '900': '#212529',
  },
  red: {
    '000': '#fff5f5',
    '100': '#ffe3e3',
    '200': '#ffc9c9',
    '300': '#ffa8a8',
    '400': '#ff8787',
    '500': '#ff6b6b',
    '600': '#fa5252',
    '700': '#f03e3e',
    '800': '#e03131',
    '900': '#c92a2a',
  },
  blue: {
    '000': '#e7f5ff',
    '100': '#d0ebff',
    '200': '#a5d8ff',
    '300': '#74c0fc',
    '400': '#4dabf7',
    '500': '#339af0',
    '600': '#228be6',
    '700': '#1c7ed6',
    '800': '#1971c2',
    '900': '#1864ab',
  },
  green: {
    '000': '#ebfbee',
    '100': '#d3f9d8',
    '200': '#b2f2bb',
    '300': '#8ce99a',
    '400': '#69db7c',
    '500': '#51cf66',
    '600': '#40c057',
    '700': '#37b24d',
    '800': '#2f9e44',
    '900': '#2b8a3e',
  },
  yellow: {
    '000': '#fff9db',
    '100': '#fff3bf',
    '200': '#ffec99',
    '300': '#ffe066',
    '400': '#ffd43b',
    '500': '#fcc419',
    '600': '#fab005',
    '700': '#f59f00',
    '800': '#f08c00',
    '900': '#e67700',
  },
}

/**
 * The default theme.
 * 
 * Colors are copied from [open-color](https://yeun.github.io/open-color/).
 */
export const DEFAULT_THEME: Theme = {
  colors,
  tokens: {
    inputBaseDefaultBorderColor: colors.gray['400'],

    inputBaseSmHeight: '2rem',
    inputBaseMdHeight: '2.25rem',
    inputBaseLgHeight: '2.5rem',

    inputBaseSmFontSize: '0.875rem',
    inputBaseMdFontSize: '1rem',
    inputBaseLgFontSize: '1.125rem',

    inputBaseSmLineHeight: '1.375rem',
    inputBaseMdLineHeight: '1.5rem',
    inputBaseLgLineHeight: '1.75rem',

    inputBaseBorderRadius: '0.375rem',

    inputBasePlaceholderColor: colors.gray['600'],
  }
};
