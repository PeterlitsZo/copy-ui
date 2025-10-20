import classNames from "classnames";
import { merge } from "es-toolkit";
import type { CSSProperties, FC } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { resolveStyle } from "@/utils/resolve-style";
import styles from "./InputBase.module.scss";

interface InputBaseProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;

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
    wrapperClassName,
    style,
    leftSection,
    rightSection,
    children,
  } = props;

  const theme = useTheme();

  const stx = resolveStyle({
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
  });

  return (
    <div
      style={stx}
      className={styles.inputBase}
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

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
