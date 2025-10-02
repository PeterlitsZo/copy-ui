import classNames from "classnames";
import { merge } from "es-toolkit";
import type { CSSProperties, FC } from "react";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./InputBase.module.scss";

interface InputBaseProps {
  size?: "sm" | "md" | "lg";

  wrapperClassName?: string;
  style?: CSSProperties;

  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  children?: React.ReactNode;
}

export const InputBase: FC<InputBaseProps> = (props) => {
  const {
    size = "md",
    wrapperClassName,
    style,
    leftSection,
    rightSection,
    children,
  } = props;

  const theme = useTheme();

  const computedStyle = mergeStyles([
    size === "sm" &&
      ({
        "--input-base-height": theme.tokens.inputBaseSmHeight,
      } as CSSProperties),
    size === "md" &&
      ({
        "--input-base-height": theme.tokens.inputBaseMdHeight,
      } as CSSProperties),
    size === "lg" &&
      ({
        "--input-base-height": theme.tokens.inputBaseLgHeight,
      } as CSSProperties),
    {
      "--input-base-min-width": "16rem",
      "--input-base-border-color": theme.tokens.inputBaseDefaultBorderColor,
      "--input-base-border-radius": theme.tokens.inputBaseBorderRadius,
    } as CSSProperties,
    style,
  ]);

  return (
    <div style={computedStyle} className={styles.inputBase}>
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
