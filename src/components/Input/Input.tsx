import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { InputBase } from "@/components/InputBase";
import { useTheme } from "@/components/ThemeProvider";
import { resolveStyle } from "@/utils/resolve-style";

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
    disabled,
    ...rest
  } = props;

  const stx = resolveStyle({
    base: {
      "--input-padding-inline-start": leftSection ? "0.125rem" : "0.5rem",
      "--input-padding-inline-end": rightSection ? "0.125rem" : "0.5rem",
      "--input-border-color-focus": theme.colors.blue["800"],
      "--input-placeholder-color": theme.tokens.inputBasePlaceholderColor,
      "--input-caret-color": theme.colors.blue["600"],
      ...style,
    },
    variants: {
      size: {
        sm: {
          "--input-font-size": theme.tokens.inputBaseSmFontSize,
          "--input-line-height": theme.tokens.inputBaseSmLineHeight,
        },
        md: {
          "--input-font-size": theme.tokens.inputBaseMdFontSize,
          "--input-line-height": theme.tokens.inputBaseMdLineHeight,
        },
        lg: {
          "--input-font-size": theme.tokens.inputBaseLgFontSize,
          "--input-line-height": theme.tokens.inputBaseLgLineHeight,
        },
      },
    },
    cls: {
      size,
    },
  });

  return (
    <InputBase
      size={size}
      leftSection={leftSection}
      rightSection={rightSection}
      disabled={disabled}
    >
      <input
        className={classNames(className, styles.input)}
        style={stx}
        {...rest}
      />
    </InputBase>
  );
};

Input.displayName = "Input";
