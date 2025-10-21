import type { CSSProperties, FC } from "react";
import tinycolor from "tinycolor2";

import { type ColorName, useTheme } from "@/components/ThemeProvider";

import styles from "./Tag.module.scss";

interface TagProps {
  color?: ColorName;
  /** @deprecated Use `size` prop instead */
  height?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  withDot?: boolean;

  children: React.ReactNode;
}

const Tag: FC<TagProps> = (props) => {
  const {
    color = "blue",
    height,
    size = "md",
    withDot = false,
    children,
  } = props;

  const theme = useTheme();

  let calcedHeight = {
    xs: "1rem",
    sm: "1.25rem",
    md: "1.5rem",
    lg: "1.75rem",
    xl: "2rem",
  }[size];
  if (height) {
    calcedHeight = height;
  }

  const computedStyles = {
    "--tag-bg-color": tinycolor(theme.colors[color]["000"])
      .setAlpha(0.5)
      .toString(),
    "--tag-color": theme.colors[color]["900"],
    "--tag-border-color": tinycolor(theme.colors[color]["200"])
      .setAlpha(0.8)
      .toString(),
    "--tag-height": calcedHeight,
  } as CSSProperties;

  return (
    <div className={styles.tag} style={computedStyles}>
      {withDot && <span className={styles.tagDot} />}
      <span>{children}</span>
    </div>
  );
};

export { Tag };
