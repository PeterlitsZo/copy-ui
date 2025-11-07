import classNames from "classnames";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
} from "lucide-react";
import { type FC, type SVGAttributes, useState } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./sort-indicator.module.scss";

type SortIndicatorDirection = "asc" | "desc" | "none";

type SortIndicatorProps = SVGAttributes<SVGElement> & {
  direction: SortIndicatorDirection;
  size?: string | number;
};

const SortIndicator: FC<SortIndicatorProps> = (props: SortIndicatorProps) => {
  const { direction, size, className, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();
  const stx = jss.hash({
    "--sort-indicator-asc-color": theme.colors.gray["600"],
    "--sort-indicator-desc-color": theme.colors.gray["600"],
    "--sort-indicator-none-color": theme.colors.gray["500"],
  });

  const Icon = {
    asc: ArrowUpWideNarrow,
    desc: ArrowDownWideNarrow,
    none: ArrowDownUp,
  }[direction];

  return (
    <Icon
      size={size}
      className={classNames(styles.sortIndicator, stx, className)}
      data-direction={direction}
      {...rest}
    />
  );
};

SortIndicator.displayName = "SortIndicator";

export type { SortIndicatorDirection, SortIndicatorProps };
export { SortIndicator };
