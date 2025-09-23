export const sourceCode: Record<string, string> = {};

sourceCode['index.tsx'] = ''
  + '// ThemeProvider from copy-ui @ 2025-09-23\n'
  + '\n'
  + 'export { ThemeProvider, ThemeContext, useTheme } from "./ThemeProvider";\n'
  ;

sourceCode['default_theme.ts'] = ''
  + 'import type { Theme } from "./ThemeProvider";\n'
  + '\n'
  + "const colors: Theme['colors'] = {\n"
  + '  gray: {\n'
  + "    '000': '#f8f9fa',\n"
  + "    '100': '#f1f3f5',\n"
  + "    '200': '#e9ecef',\n"
  + "    '300': '#dee2e6',\n"
  + "    '400': '#ced4da',\n"
  + "    '500': '#adb5bd',\n"
  + "    '600': '#868e96',\n"
  + "    '700': '#495057',\n"
  + "    '800': '#343a40',\n"
  + "    '900': '#212529',\n"
  + '  },\n'
  + '  red: {\n'
  + "    '000': '#fff5f5',\n"
  + "    '100': '#ffe3e3',\n"
  + "    '200': '#ffc9c9',\n"
  + "    '300': '#ffa8a8',\n"
  + "    '400': '#ff8787',\n"
  + "    '500': '#ff6b6b',\n"
  + "    '600': '#fa5252',\n"
  + "    '700': '#f03e3e',\n"
  + "    '800': '#e03131',\n"
  + "    '900': '#c92a2a',\n"
  + '  },\n'
  + '  blue: {\n'
  + "    '000': '#e7f5ff',\n"
  + "    '100': '#d0ebff',\n"
  + "    '200': '#a5d8ff',\n"
  + "    '300': '#74c0fc',\n"
  + "    '400': '#4dabf7',\n"
  + "    '500': '#339af0',\n"
  + "    '600': '#228be6',\n"
  + "    '700': '#1c7ed6',\n"
  + "    '800': '#1971c2',\n"
  + "    '900': '#1864ab',\n"
  + '  },\n'
  + '  green: {\n'
  + "    '000': '#ebfbee',\n"
  + "    '100': '#d3f9d8',\n"
  + "    '200': '#b2f2bb',\n"
  + "    '300': '#8ce99a',\n"
  + "    '400': '#69db7c',\n"
  + "    '500': '#51cf66',\n"
  + "    '600': '#40c057',\n"
  + "    '700': '#37b24d',\n"
  + "    '800': '#2f9e44',\n"
  + "    '900': '#2b8a3e',\n"
  + '  },\n'
  + '  yellow: {\n'
  + "    '000': '#fff9db',\n"
  + "    '100': '#fff3bf',\n"
  + "    '200': '#ffec99',\n"
  + "    '300': '#ffe066',\n"
  + "    '400': '#ffd43b',\n"
  + "    '500': '#fcc419',\n"
  + "    '600': '#fab005',\n"
  + "    '700': '#f59f00',\n"
  + "    '800': '#f08c00',\n"
  + "    '900': '#e67700',\n"
  + '  },\n'
  + '}\n'
  + '\n'
  + '/**\n'
  + ' * The default theme.\n'
  + ' * \n'
  + ' * Colors are copied from [open-color](https://yeun.github.io/open-color/).\n'
  + ' */\n'
  + 'export const DEFAULT_THEME: Theme = {\n'
  + '  colors,\n'
  + '  tokens: {\n'
  + "    inputBaseDefaultBorderColor: colors.gray['400'],\n"
  + '\n'
  + "    inputBaseSmHeight: '2rem',\n"
  + "    inputBaseMdHeight: '2.25rem',\n"
  + "    inputBaseLgHeight: '2.5rem',\n"
  + '\n'
  + "    inputBaseSmFontSize: '0.875rem',\n"
  + "    inputBaseMdFontSize: '1rem',\n"
  + "    inputBaseLgFontSize: '1.125rem',\n"
  + '\n'
  + "    inputBaseSmLineHeight: '1.375rem',\n"
  + "    inputBaseMdLineHeight: '1.5rem',\n"
  + "    inputBaseLgLineHeight: '1.75rem',\n"
  + '\n'
  + "    inputBaseBorderRadius: '0.375rem',\n"
  + '\n'
  + "    inputBasePlaceholderColor: colors.gray['600'],\n"
  + '  }\n'
  + '};\n'
  ;

sourceCode['ThemeProvider.tsx'] = ''
  + 'import { createContext, useContext, useLayoutEffect, useState, type FC } from "react";\n'
  + '\n'
  + 'import { DEFAULT_THEME } from "./default_theme";\n'
  + '\n'
  + '// Theme type\n'
  + '// =============================================================================\n'
  + '\n'
  + 'export interface Theme {\n'
  + '  colors: {\n'
  + '    [colorName: string]: { [colorNo: string]: string }\n'
  + '  },\n'
  + '  tokens: {\n'
  + '    inputBaseDefaultBorderColor: string,\n'
  + '\n'
  + '    inputBaseSmHeight: string,\n'
  + '    inputBaseMdHeight: string,\n'
  + '    inputBaseLgHeight: string,\n'
  + '\n'
  + '    inputBaseSmFontSize: string,\n'
  + '    inputBaseMdFontSize: string,\n'
  + '    inputBaseLgFontSize: string,\n'
  + '\n'
  + '    inputBaseSmLineHeight: string,\n'
  + '    inputBaseMdLineHeight: string,\n'
  + '    inputBaseLgLineHeight: string,\n'
  + '\n'
  + '    inputBaseBorderRadius: string,\n'
  + '\n'
  + '    inputBasePlaceholderColor: string,\n'
  + '  }\n'
  + '}\n'
  + '\n'
  + '// ThemeContext\n'
  + '// =============================================================================\n'
  + '\n'
  + 'export const ThemeContext = createContext<Theme>(DEFAULT_THEME);\n'
  + '\n'
  + '// useTheme\n'
  + '// =============================================================================\n'
  + '\n'
  + 'export function useTheme() {\n'
  + '  const theme = useContext(ThemeContext);\n'
  + '  if (!theme) {\n'
  + "    throw new Error('useTheme must be used within a ThemeProvider');\n"
  + '  }\n'
  + '\n'
  + '  return theme;\n'
  + '}\n'
  + '\n'
  + '// ThemeProvider\n'
  + '// =============================================================================\n'
  + '\n'
  + 'export interface ThemeProviderProps {\n'
  + '  children: React.ReactNode;\n'
  + '}\n'
  + '\n'
  + 'export const ThemeProvider: FC<ThemeProviderProps> = (props) => {\n'
  + '  const [theme, _] = useState<Theme>(DEFAULT_THEME);\n'
  + '\n'
  + '  return (\n'
  + '    <ThemeContext value={theme}>\n'
  + '      {props.children}\n'
  + '    </ThemeContext>\n'
  + '  );\n'
  + '}\n'
  + '\n'
  + "ThemeProvider.displayName = 'ThemeProvider';\n"
  ;

