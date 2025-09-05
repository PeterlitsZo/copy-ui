import { createContext, useState } from "react";

export interface Theme {
  colors: {
    [colorName: string]: { [colorNo: string]: string }
  }
}

/**
 * The default theme.
 * 
 * Colors are copied from [open-color](https://yeun.github.io/open-color/).
 */
const DEFAULT_THEME: Theme = {
  colors: {
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
    }
  }
};

export const ThemeContext = createContext<Theme>(DEFAULT_THEME);

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const [theme, _] = useState<Theme>(DEFAULT_THEME);

  return (
    <ThemeContext value={theme}>
      {props.children}
    </ThemeContext>
  );
}
