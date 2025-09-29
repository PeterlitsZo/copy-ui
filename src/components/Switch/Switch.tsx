import { type CSSProperties, type FC } from "react";
import { merge } from "es-toolkit";

import { useTheme } from "../ThemeProvider";

import styles from "./Switch.module.scss";

export type SwitchProps = {
  size?: 'sm' | 'md' | 'lg';
  value: boolean;
  onChange?: (value: boolean) => void;
};

export const Switch: FC<SwitchProps> = (props) => {
  const { size = 'md', value, onChange } = props;

  const theme = useTheme();

  const computedStyle = mergeStyles([
    size === 'sm' && {
      '--switch-rail-width': '3.5rem',
      '--switch-rail-height': theme.tokens.inputBaseSmHeight,
    } as CSSProperties,
    size === 'md' && {
      '--switch-rail-width': '4rem',
      '--switch-rail-height': theme.tokens.inputBaseMdHeight,
    } as CSSProperties,
    size === 'lg' && {
      '--switch-rail-width': '4.5rem',
      '--switch-rail-height': theme.tokens.inputBaseLgHeight,
    } as CSSProperties,
    {
      '--switch-rail-bg': theme.colors.gray['300'],
      '--switch-rail-checked-bg': theme.colors.blue['600'],
      '--switch-thumb-bg': 'white',
    } as CSSProperties,
  ]);

  return (
    <div
      style={computedStyle}
      className={styles.rail}
      data-checked={value}
      onClick={() => onChange?.(!value)}
    >
      <div className={styles.thumb} />
    </div>
  );
};

Switch.displayName = 'Switch';

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
