import classNames from "classnames";
import type { CSSProperties, FC } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";
import { resolveStyle } from "@/utils/resolve-style";

import styles from "./input-base.module.scss";

interface InputBaseProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;

  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;

  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  children?: React.ReactNode;
}

export const InputBase: FC<InputBaseProps> = (props) => {
  const {
    size = "md",
    disabled = false,

    className,
    wrapperClassName,
    style,

    leftSection,
    rightSection,
    children,
  } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash(
    resolveStyle({
      base: {
        "--input-base-min-width": "16rem",
        "--input-base-border-color": theme.tokens.inputBaseDefaultBorderColor,
        "--input-base-border-radius": theme.tokens.inputBaseBorderRadius,
        "--input-base-disabled-bg-color": theme.colors.gray["100"],
        ...style,
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
      },
      cls: {
        size,
      },
    }),
  );

  return (
    <div
      className={classNames(styles.inputBase, stx, className)}
      data-disabled={disabled || undefined}
    >
      {leftSection && <div className={styles.leftSection}>{leftSection}</div>}
      <div className={classNames(styles.wrapper, wrapperClassName)}>
        {children}
      </div>
      {rightSection && (
        <div className={styles.rightSection}>{rightSection}</div>
      )}
    </div>
  );
};

InputBase.displayName = "InputBase";
