import { merge } from "es-toolkit";
import type { CSSProperties, FC } from "react";

import styles from "./InputBase.module.scss";
import { useTheme } from "../ThemeProvider";

interface InputBaseProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const InputBase: FC<InputBaseProps> = (props) => {
  const { size = 'md', children } = props;

  const theme = useTheme();

  const computedStyle = mergeStyles([
    size === 'sm' && {
      '--input-base-height': theme.tokens.inputBaseSmHeight,
    } as CSSProperties,
    size === 'md' && {
      '--input-base-height': theme.tokens.inputBaseMdHeight,
    } as CSSProperties,
    size === 'lg' && {
      '--input-base-height': theme.tokens.inputBaseLgHeight,
    } as CSSProperties,
    {
      '--input-base-min-width': '16rem',
      '--input-base-border-color': theme.tokens.inputBaseDefaultBorderColor,
      '--input-base-border-radius': theme.tokens.inputBaseBorderRadius,
    } as CSSProperties,
  ]);

  return (
    <div style={computedStyle} className={styles.inputBase}>
      {children}
    </div>
  )
};

InputBase.displayName = "InputBase";

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
