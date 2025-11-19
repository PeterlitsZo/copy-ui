import classNames from "classnames";
import type { ComponentProps, CSSProperties, FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { InputBase } from "@/components/InputBase";
import { resolveStyle } from "@/utils/resolve-style";

import styles from "./input.module.scss";

export type InputProps = Omit<ComponentProps<"input">, "size"> & {
  variant?: "default" | "filled";
  size?: "sm" | "md" | "lg";
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

export const Input: FC<InputProps> = (props) => {
  const {
    variant = "default",
    size = "md",
    leftSection,
    rightSection,
    className,
    disabled,
    ...rest
  } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash(
    resolveStyle({
      base: {
        "--input-focus-border-color": theme.colors.blue["800"],
        "--input-padding-inline-start": leftSection ? "0.125rem" : "0.75rem",
        "--input-padding-inline-end": rightSection ? "0.125rem" : "0.75rem",
        "--input-placeholder-color": theme.tokens.inputBasePlaceholderColor,
        "--input-caret-color": theme.colors.blue["800"],
      },
      variants: {
        variant: {
          default: {
            "--input-bg-color": "white",
          },
          filled: {
            "--input-bg-color": theme.colors.gray["000"],
          },
        },
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
        variant,
      },
    }),
  );

  return (
    <InputBase
      size={size}
      leftSection={leftSection}
      rightSection={rightSection}
      disabled={disabled}
      style={
        // TODO (PeterlitsZo): I think it is a bad idea... Need some time to rethink it.
        {
          "--input-base-border-color":
            variant === "filled"
              ? "transparent"
              : theme.tokens.inputBaseDefaultBorderColor,
        } as CSSProperties
      }
      className={classNames(styles.inputBase, stx)}
    >
      <input className={classNames(styles.input, className)} {...rest} />
    </InputBase>
  );
};

Input.displayName = "Input";
