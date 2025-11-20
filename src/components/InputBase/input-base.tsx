import classNames from "classnames";
import type { CSSProperties, FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { resolveStyle } from "@/utils/resolve-style";

import styles from "./input-base.module.scss";

interface InputBaseProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  width?: "sm" | "md" | "lg" | "full";

  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;

  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  children?: React.ReactNode;
}

export const InputBase: FC<InputBaseProps> = (props) => {
  const {
    size = "md",
    disabled = false,
    width = "md",

    className,
    style,
    wrapperClassName,
    wrapperStyle,

    leftSection,
    rightSection,
    children,
  } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash(
    resolveStyle({
      base: {
        "--input-base-border-color": theme.tokens.inputBaseDefaultBorderColor,
        "--input-base-border-radius": theme.tokens.inputBaseBorderRadius,
        "--input-base-disabled-bg-color": theme.colors.gray["100"],
      },
      variants: {
        size: {
          sm: {
            "--input-base-height": theme.tokens.inputBaseSmHeight,
          },
          md: {
            "--input-base-height": theme.tokens.inputBaseMdHeight,
          },
          lg: {
            "--input-base-height": theme.tokens.inputBaseLgHeight,
          },
        },
        width: {
          sm: { "--input-base-width": "12rem" },
          md: { "--input-base-width": "16rem" },
          lg: { "--input-base-width": "20rem" },
          full: { "--input-base-width": "100%" },
        },
      },
      cls: {
        size,
        width,
      },
    }),
  );

  return (
    <div
      className={classNames(styles.inputBase, stx, className)}
      style={style}
      data-disabled={disabled || undefined}
    >
      {leftSection && <div className={styles.leftSection}>{leftSection}</div>}
      <div
        className={classNames(styles.wrapper, wrapperClassName)}
        style={wrapperStyle}
      >
        {children}
      </div>
      {rightSection && (
        <div className={styles.rightSection}>{rightSection}</div>
      )}
    </div>
  );
};

InputBase.displayName = "InputBase";
