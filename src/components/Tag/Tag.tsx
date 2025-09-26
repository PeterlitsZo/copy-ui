import type { CSSProperties, FC } from "react";

import styles from "./Tag.module.scss";
import { useTheme } from "../ThemeProvider";

interface TagProps {
  children: React.ReactNode;

  color?: string;
  height?: string;
}

export const Tag: FC<TagProps> = (props) => {
  const {
    children,
    color = 'blue',
    height = '1.5rem',
  } = props;

  const theme = useTheme();

  const computedStyles = {
    '--tag-bg-color': theme.colors[color]['000'],
    '--tag-color': theme.colors[color]['900'],
    '--tag-height': height,
  } as CSSProperties;

  return (
    <div className={styles.tag} style={computedStyles}>
      {children}
    </div>
  );
}
