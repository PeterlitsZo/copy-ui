import classNames from "classnames";
import { merge } from "es-toolkit";
import type { ComponentProps, CSSProperties } from "react";
import tinycolor from "tinycolor2";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./Button.module.scss";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "filled" | "ghost" | "light";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

export function Button(props: ButtonProps) {
  const theme = useTheme();

  const {
    className,
    style,
    children,
    leftSection,
    rightSection,
    variant = "default",
    size = "md",
    ...rest
  } = props;

  const computedStyle = mergeStyles([
    variant === "default" &&
      ({
        "--button-bg": "white",
        "--button-color": theme.colors.gray["800"],
        "--button-border-width": "1px",
        "--button-border-style": "solid",
        "--button-border-color": theme.tokens.inputBaseDefaultBorderColor,
        "--button-bg-hover": theme.colors.gray["100"],
      } as CSSProperties),
    variant === "filled" &&
      ({
        "--button-bg": theme.colors.blue["600"],
        "--button-color": "white",
        "--button-border-width": "1px",
        "--button-border-style": "solid",
        "--button-border-color": theme.colors.blue["700"],
        "--button-bg-hover": theme.colors.blue["700"],
      } as CSSProperties),
    variant === "ghost" &&
      ({
        "--button-bg": "transparent",
        "--button-color": theme.colors.blue["800"],
        "--button-border-width": "1px",
        "--button-border-style": "solid",
        "--button-border-color": "transparent",
        "--button-bg-hover": tinycolor(theme.colors.gray["200"])
          .setAlpha(0.5)
          .toString(),
      } as CSSProperties),
    variant === "light" &&
      ({
        "--button-bg": theme.colors.blue["000"],
        "--button-color": theme.colors.blue["800"],
        "--button-border-width": "1px",
        "--button-border-style": "solid",
        "--button-border-color": "transparent",
        "--button-bg-hover": theme.colors.blue["100"],
      } as CSSProperties),

    size === "xs" &&
      ({
        "--button-height": theme.tokens.inputBaseXsHeight,
        "--button-padding-x": "0.625rem",
        "--button-section-gap": "0.375rem",
        "--button-font-size": "0.75rem",
      } as CSSProperties),
    size === "sm" &&
      ({
        "--button-height": theme.tokens.inputBaseSmHeight,
        "--button-padding-x": "0.75rem",
        "--button-section-gap": "0.5rem",
        "--button-font-size": "0.875rem",
      } as CSSProperties),
    size === "md" &&
      ({
        "--button-height": theme.tokens.inputBaseMdHeight,
        "--button-padding-x": "1rem",
        "--button-section-gap": "0.625rem",
        "--button-font-size": "1rem",
      } as CSSProperties),
    size === "lg" &&
      ({
        "--button-height": theme.tokens.inputBaseLgHeight,
        "--button-padding-x": "1.25rem",
        "--button-section-gap": "0.75rem",
        "--button-font-size": "1.125rem",
      } as CSSProperties),
    size === "xl" &&
      ({
        "--button-height": theme.tokens.inputBaseXlHeight,
        "--button-padding-x": "1.5rem",
        "--button-section-gap": "1rem",
        "--button-font-size": "1.25rem",
      } as CSSProperties),

    {
      "--button-radius": "0.375rem",
    } as CSSProperties,
    style,
  ]);

  return (
    <button
      className={classNames(styles.button, className)}
      style={computedStyle}
      {...rest}
    >
      {leftSection && (
        <span className={styles.buttonLeftSection}>{leftSection}</span>
      )}
      <span>{children}</span>
      {rightSection && (
        <span className={styles.buttonRightSection}>{rightSection}</span>
      )}
    </button>
  );
}

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
