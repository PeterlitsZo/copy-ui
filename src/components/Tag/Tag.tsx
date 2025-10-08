import type { CSSProperties, FC } from "react";
import tinycolor from "tinycolor2";
import { type ColorName, useTheme } from "../ThemeProvider";
import styles from "./Tag.module.scss";

interface TagProps {
  children: React.ReactNode;

  color?: ColorName;
  height?: string;
}

export const Tag: FC<TagProps> = (props) => {
  const { children, color = "blue", height = "1.5rem" } = props;

  const theme = useTheme();

  const computedStyles = {
    "--tag-bg-color": tinycolor(theme.colors[color]["000"])
      .setAlpha(0.5)
      .toString(),
    "--tag-color": theme.colors[color]["900"],
    "--tag-border-color": tinycolor(theme.colors[color]["200"])
      .setAlpha(0.8)
      .toString(),
    "--tag-height": height,
  } as CSSProperties;

  return (
    <div className={styles.tag} style={computedStyles}>
      {children}
    </div>
  );
};
