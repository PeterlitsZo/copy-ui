import { useState, type CSSProperties, type FC } from "react";

import { useTheme } from "../ThemeProvider";

import styles from "./Switch.module.scss";

export const Switch: FC = () => {
  const theme = useTheme();

  const [isChecked, setIsChecked] = useState(false);

  const computedStyle = {
    '--switch-rail-width': '4rem',
    '--switch-rail-height': '2.25rem',
    '--switch-rail-bg': theme.colors.gray['300'],
    '--switch-rail-checked-bg': theme.colors.blue['600'],
    '--switch-thumb-bg': 'white',
  } as CSSProperties;

  return (
    <div style={computedStyle} className={styles.rail} data-checked={isChecked} onClick={() => setIsChecked(!isChecked)}>
      <div className={styles.thumb} />
    </div>
  );
};

Switch.displayName = 'Switch';