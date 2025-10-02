import { merge } from "es-toolkit";
import type { CSSProperties, FC } from "react";

import { useTheme } from "../ThemeProvider";

import styles from "./Switch.module.scss";

export type SwitchProps = {
  size?: "text" | "xs" | "sm" | "md" | "lg" | "xl";
  value: boolean;
  onChange?: (value: boolean) => void;
};

export const Switch: FC<SwitchProps> = (props) => {
  const { size = "md", value, onChange } = props;

  const theme = useTheme();

  const computedStyle = mergeStyles([
    size === "text" &&
      ({
        "--switch-rail-width": "1.75rem",
        "--switch-rail-height": "1rem",
        "--switch-thumb-gap": "2.5px",
      } as CSSProperties),
    size === "xs" &&
      ({
        "--switch-rail-width": "2.5rem",
        "--switch-rail-height": `calc(${theme.tokens.inputBaseXsHeight} * 0.8)`,
        "--switch-thumb-gap": "2.5px",
      } as CSSProperties),
    size === "sm" &&
      ({
        "--switch-rail-width": "2.875rem",
        "--switch-rail-height": `calc(${theme.tokens.inputBaseSmHeight} * 0.8)`,
        "--switch-thumb-gap": "3px",
      } as CSSProperties),
    size === "md" &&
      ({
        "--switch-rail-width": "3.25rem",
        "--switch-rail-height": `calc(${theme.tokens.inputBaseMdHeight} * 0.8)`,
        "--switch-thumb-gap": "3px",
      } as CSSProperties),
    size === "lg" &&
      ({
        "--switch-rail-width": "3.625rem",
        "--switch-rail-height": `calc(${theme.tokens.inputBaseLgHeight} * 0.8)`,
        "--switch-thumb-gap": "3.5px",
      } as CSSProperties),
    size === "xl" &&
      ({
        "--switch-rail-width": "4.25rem",
        "--switch-rail-height": `calc(${theme.tokens.inputBaseXlHeight} * 0.8)`,
        "--switch-thumb-gap": "3.5px",
      } as CSSProperties),
    {
      "--switch-rail-bg": theme.colors.gray["300"],
      "--switch-rail-checked-bg": theme.colors.blue["600"],
      "--switch-thumb-bg": "white",
    } as CSSProperties,
  ]);

  return (
    <button
      style={computedStyle}
      className={styles.rail}
      data-checked={value}
      onClick={() => onChange?.(!value)}
      type="button"
      role="switch"
      aria-checked={value}
    >
      <div className={styles.thumb} />
    </button>
  );
};

Switch.displayName = "Switch";

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
