import { createContext, useContext, useLayoutEffect, useState, type FC } from "react";

import { DEFAULT_THEME } from "./default_theme";

// Theme type
// =============================================================================

export interface Theme {
  colors: {
    [colorName: string]: { [colorNo: string]: string }
  },
  tokens: {
    inputBaseDefaultBorderColor: string,

    inputBaseSmHeight: string,
    inputBaseMdHeight: string,
    inputBaseLgHeight: string,

    inputBaseSmFontSize: string,
    inputBaseMdFontSize: string,
    inputBaseLgFontSize: string,

    inputBaseSmLineHeight: string,
    inputBaseMdLineHeight: string,
    inputBaseLgLineHeight: string,

    inputBaseBorderRadius: string,

    inputBasePlaceholderColor: string,
  }
}

// ThemeContext
// =============================================================================

export const ThemeContext = createContext<Theme>(DEFAULT_THEME);

// useTheme
// =============================================================================

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return theme;
}

// ThemeProvider
// =============================================================================

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const [theme, _] = useState<Theme>(DEFAULT_THEME);

  return (
    <ThemeContext value={theme}>
      {props.children}
    </ThemeContext>
  );
}

ThemeProvider.displayName = 'ThemeProvider';
