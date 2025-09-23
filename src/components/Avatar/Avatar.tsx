import type { CSSProperties, FC } from "react";

import styles from "./Avatar.module.scss";
import { useTheme } from "../ThemeProvider";

interface AvatarProps {
  size: string;
  color?: string;
  children?: React.ReactNode;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { size, color = 'blue', children } = props;

  const theme = useTheme();

  const style = {
    '--avatar-size': size,
    '--avatar-color': theme.colors[color]['600'],
    '--avatar-background-color': theme.colors[color]['000']
  } as CSSProperties;

  return (
    <div
      className={styles.avatar}
      style={style}
    >
      {children}
    </div>
  );
}

Avatar.displayName = "Avatar";
