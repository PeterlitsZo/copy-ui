import classNames from "classnames";
import type { FC } from "react";
import tinycolor from "tinycolor2";

import { type ColorName, useJss, useTheme } from "@/components/CopyUiProvider";
import { resolveStyle } from "@/utils/resolve-style";

import styles from "./tag.module.scss";

interface TagProps {
  variant?: "default" | "outline" | "badge" | "secondary" | "destructive";

  color?: ColorName;
  /** @deprecated Use `size` prop instead */
  height?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  withDot?: boolean;

  children: React.ReactNode;
}

const Tag: FC<TagProps> = (props) => {
  const {
    variant = "default",
    color = "blue",
    height,
    size = "md",
    withDot = false,
    children,
  } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash(
    resolveStyle({
      base: {
        "--tag-height": normalizeHeight(size, height),
      },
      variants: {
        variant: {
          default: {
            "--tag-bg-color": tinycolor(theme.colors[color]["000"])
              .setAlpha(0.5)
              .toString(),
            "--tag-color": theme.colors[color]["900"],
            "--tag-border-color": tinycolor(theme.colors[color]["200"])
              .setAlpha(0.8)
              .toString(),
          },
          outline: {
            "--tag-bg-color": "transparent",
            "--tag-color": theme.colors.gray["900"],
            "--tag-border-color": theme.colors.gray["400"],
          },
          badge: {
            "--tag-bg-color": theme.colors.gray["800"],
            "--tag-color": "white",
            "--tag-border-color": theme.colors.gray["800"],
          },
          secondary: {
            "--tag-bg-color": theme.colors.gray["100"],
            "--tag-color": theme.colors.gray["800"],
            "--tag-border-color": theme.colors.gray["200"],
          },
          destructive: {
            "--tag-bg-color": theme.colors.red["700"],
            "--tag-color": "white",
            "--tag-border-color": theme.colors.red["700"],
          },
        },
      },
      cls: {
        variant,
      },
    }),
  );

  return (
    <div className={classNames(styles.tag, stx)}>
      {withDot && <span className={styles.tagDot} />}
      <span>{children}</span>
    </div>
  );
};

function normalizeHeight(
  size: "xs" | "sm" | "md" | "lg" | "xl",
  height?: string,
) {
  if (height) {
    return height;
  }
  return {
    xs: "1rem",
    sm: "1.25rem",
    md: "1.5rem",
    lg: "1.75rem",
    xl: "2rem",
  }[size];
}

export { Tag };
