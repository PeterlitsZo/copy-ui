import { createContext, type FC, useContext, useState } from "react";

import { DEFAULT_THEME } from "./default_theme";

// Theme type
// =============================================================================

export type ColorName =
  | "gray"
  | "red"
  | "pink"
  | "grape"
  | "blue"
  | "violet"
  | "indigo"
  | "green"
  | "yellow";

export type ColorNo =
  | "000"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export interface Theme {
  colors: {
    [colorName in ColorName]: { [colorNo in ColorNo]: string };
  };
  shadow: {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  tokens: {
    inputBaseDefaultBorderColor: string;

    inputBaseXsHeight: string;
    inputBaseSmHeight: string;
    inputBaseMdHeight: string;
    inputBaseLgHeight: string;
    inputBaseXlHeight: string;

    inputBaseXsFontSize: string;
    inputBaseSmFontSize: string;
    inputBaseMdFontSize: string;
    inputBaseLgFontSize: string;
    inputBaseXlFontSize: string;

    inputBaseXsLineHeight: string;
    inputBaseSmLineHeight: string;
    inputBaseMdLineHeight: string;
    inputBaseLgLineHeight: string;
    inputBaseXlLineHeight: string;

    inputBaseBorderRadius: string;

    inputBasePlaceholderColor: string;
  };
}

// ThemeContext
// =============================================================================

export const ThemeContext = createContext<Theme>(DEFAULT_THEME);

// useTheme
// =============================================================================

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
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

  return <ThemeContext value={theme}>{props.children}</ThemeContext>;
};

ThemeProvider.displayName = "ThemeProvider";
