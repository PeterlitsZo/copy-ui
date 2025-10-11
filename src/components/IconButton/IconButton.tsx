import classNames from "classnames";
import { merge } from "es-toolkit";
import type { ComponentProps, CSSProperties, FC } from "react";

import { useTheme } from "@/components/ThemeProvider";

import styles from "./IconButton.module.scss";

export type IconButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "filled";
  size?: "sm" | "md" | "lg";
};

export const IconButton: FC<IconButtonProps> = (props) => {
  const theme = useTheme();

  const { className, style, variant = "default", size = "md", ...rest } = props;

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
    size === "sm" &&
      ({
        "--button-size": "2rem",
      } as CSSProperties),
    size === "md" &&
      ({
        "--button-size": "2.25rem",
      } as CSSProperties),
    size === "lg" &&
      ({
        "--button-size": "2.5rem",
      } as CSSProperties),
    {
      "--button-radius": "0.375rem",
    } as CSSProperties,
    style,
  ]);

  return (
    <button
      className={classNames(styles.iconButton, className)}
      style={computedStyle}
      {...rest}
    >
      {props.children}
    </button>
  );
};

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
