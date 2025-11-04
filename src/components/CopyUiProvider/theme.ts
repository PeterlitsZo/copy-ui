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
