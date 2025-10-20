import classNames from "classnames";
import type { ComponentProps, FC } from "react";
import tinycolor from "tinycolor2";

import { type ColorName, useTheme } from "@/components/ThemeProvider";
import { resolveStyle } from "@/utils/resolve-style";

import styles from "./Button.module.scss";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "filled" | "ghost" | "light";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: ColorName;

  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

const Button: FC<ButtonProps> = (props) => {
  const theme = useTheme();

  const {
    className,
    style,
    children,
    leftSection,
    rightSection,
    disabled,
    variant = "default",
    size = "md",
    color = "blue",
    ...rest
  } = props;

  const stx = resolveStyle({
    base: {
      "--button-radius": "0.375rem",
      ...style,
    },
    variants: {
      variant: {
        default: {
          "--button-bg": "white",
          "--button-color": theme.colors.gray["800"],
          "--button-border-width": "1px",
          "--button-border-style": "solid",
          "--button-border-color": theme.tokens.inputBaseDefaultBorderColor,
          "--button-bg-hover": theme.colors.gray["100"],
          "--button-disabled-bg-color": theme.colors.gray["100"],
          "--button-disabled-color": theme.colors.gray["500"],
          "--button-disabled-border-color":
            theme.tokens.inputBaseDefaultBorderColor,
          "--button-disabled-hover-bg-color": theme.colors.gray["100"],
        },
        filled: {
          "--button-bg": theme.colors[color]["600"],
          "--button-color": "white",
          "--button-border-width": "1px",
          "--button-border-style": "solid",
          "--button-border-color": theme.colors[color]["700"],
          "--button-bg-hover": theme.colors[color]["700"],
          "--button-disabled-bg-color": theme.colors.gray["300"],
          "--button-disabled-color": theme.colors.gray["500"],
          "--button-disabled-border-color": theme.colors.gray["300"],
          "--button-disabled-hover-bg-color": theme.colors.gray["300"],
        },
        ghost: {
          "--button-bg": "transparent",
          "--button-color": theme.colors[color]["800"],
          "--button-border-width": "1px",
          "--button-border-style": "solid",
          "--button-border-color": "transparent",
          "--button-bg-hover": tinycolor(theme.colors.gray["200"])
            .setAlpha(0.5)
            .toString(),
          "--button-disabled-color": theme.colors.gray["500"],
          "--button-disabled-bg-color": "transparent",
          "--button-disabled-hover-bg-color": "transparent",
          "--button-disabled-border-color": "transparent",
        },
        light: {
          "--button-bg": theme.colors[color]["000"],
          "--button-color": theme.colors[color]["800"],
          "--button-border-width": "1px",
          "--button-border-style": "solid",
          "--button-border-color": "transparent",
          "--button-bg-hover": theme.colors[color]["100"],
          "--button-disabled-color": theme.colors.gray["500"],
          "--button-disabled-bg-color": theme.colors.gray["100"],
          "--button-disabled-hover-bg-color": theme.colors.gray["100"],
          "--button-disabled-border-color": "transparent",
        },
      },
      size: {
        xs: {
          "--button-height": theme.tokens.inputBaseXsHeight,
          "--button-padding-x": "0.625rem",
          "--button-section-gap": "0.375rem",
          "--button-font-size": "0.75rem",
        },
        sm: {
          "--button-height": theme.tokens.inputBaseSmHeight,
          "--button-padding-x": "0.75rem",
          "--button-section-gap": "0.5rem",
          "--button-font-size": "0.875rem",
        },
        md: {
          "--button-height": theme.tokens.inputBaseMdHeight,
          "--button-padding-x": "1rem",
          "--button-section-gap": "0.625rem",
          "--button-font-size": "1rem",
        },
        lg: {
          "--button-height": theme.tokens.inputBaseLgHeight,
          "--button-padding-x": "1.25rem",
          "--button-section-gap": "0.75rem",
          "--button-font-size": "1.125rem",
        },
        xl: {
          "--button-height": theme.tokens.inputBaseXlHeight,
          "--button-padding-x": "1.5rem",
          "--button-section-gap": "1rem",
          "--button-font-size": "1.25rem",
        },
      },
    },
    cls: {
      variant,
      size,
    },
  });

  return (
    <button
      className={classNames(styles.button, className)}
      style={stx}
      disabled={disabled}
      data-disabled={disabled ? true : undefined}
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
};

Button.displayName = "Button";

export { Button };
