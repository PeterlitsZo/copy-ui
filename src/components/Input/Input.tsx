import classNames from "classnames";
import { merge } from "es-toolkit";
import type { ComponentProps, CSSProperties, FC } from "react";
import { InputBase } from "../InputBase";
import { useTheme } from "../ThemeProvider";

import styles from "./Input.module.scss";

export type InputProps = Omit<ComponentProps<"input">, "size"> & {
  size?: "sm" | "md" | "lg";
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

export const Input: FC<InputProps> = (props) => {
  const theme = useTheme();

  const {
    size = "md",
    leftSection,
    rightSection,
    className,
    style,
    ...rest
  } = props;

  const computedStyle = mergeStyles([
    size === "sm" &&
      ({
        "--input-font-size": theme.tokens.inputBaseSmFontSize,
        "--input-line-height": theme.tokens.inputBaseSmLineHeight,
      } as CSSProperties),
    size === "md" &&
      ({
        "--input-font-size": theme.tokens.inputBaseMdFontSize,
        "--input-line-height": theme.tokens.inputBaseMdLineHeight,
      } as CSSProperties),
    size === "lg" &&
      ({
        "--input-font-size": theme.tokens.inputBaseLgFontSize,
        "--input-line-height": theme.tokens.inputBaseLgLineHeight,
      } as CSSProperties),
    {
      "--input-padding-inline-start": leftSection ? "0.125rem" : "0.5rem",
      "--input-padding-inline-end": rightSection ? "0.125rem" : "0.5rem",
      "--input-border-color-focus": theme.colors.blue["800"],
      "--input-placeholder-color": theme.tokens.inputBasePlaceholderColor,
      "--input-caret-color": theme.colors.blue["600"],
    } as CSSProperties,
    style,
  ]);

  return (
    <InputBase
      size={size}
      leftSection={leftSection}
      rightSection={rightSection}
    >
      <input
        className={classNames(className, styles.input)}
        style={computedStyle}
        {...rest}
      />
    </InputBase>
  );
};

Input.displayName = "Input";

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
