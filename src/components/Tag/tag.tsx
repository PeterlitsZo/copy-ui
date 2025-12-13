import classNames from "classnames";
import type { FC } from "react";
import tinycolor from "tinycolor2";

import type { ColorName, Theme } from "@/components/CopyUiProvider";
import { useJss, useTheme } from "@/components/CopyUiProvider";
import { resolveStyle2 } from "@/utils/resolve-style2";

import styles from "./tag.module.css";

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
    color = variant === "default" ? "blue" : "gray",
    height,
    size = "md",
    withDot = false,
    children,
  } = props;

  const theme = useTheme();
  const jss = useJss();

  const baseStx = jss.hash({
    "--tag-h": normalizeHeight(size, height),
  });
  const stx = jss.hash(
    tagStyle(
      theme,
      color,
    )({
      variant,
    }),
  );

  return (
    <div className={classNames(styles.tag, baseStx, stx)}>
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

const tagStyle = (theme: Theme, color: ColorName) =>
  resolveStyle2({
    variant: {
      default: {
        "--tag-bgColor": tinycolor(theme.colors[color]["100"])
          .setAlpha(0.5)
          .toString(),
        "--tag-color": theme.colors[color]["700"],
        "--tag-bdColor": tinycolor(theme.colors[color]["300"])
          .setAlpha(0.8)
          .toString(),
      },
      outline: {
        "--tag-bgColor": "transparent",
        "--tag-color": theme.colors[color]["900"],
        "--tag-bdColor": theme.colors[color]["400"],
      },
      badge: {
        "--tag-bgColor": theme.colors[color]["800"],
        "--tag-color": "white",
        "--tag-bdColor": theme.colors[color]["800"],
      },
      secondary: {
        "--tag-bgColor": theme.colors[color]["050"],
        "--tag-color": theme.colors[color]["650"],
        "--tag-bdColor": theme.colors[color]["200"],
      },
      destructive: {
        "--tag-bgColor": theme.colors.red["600"],
        "--tag-color": "white",
        "--tag-bdColor": theme.colors.red["650"],
      },
    },
  });

export { Tag };
