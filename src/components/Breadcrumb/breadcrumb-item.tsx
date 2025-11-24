import classNames from "classnames";
import type { FC } from "react";

import { useJss, useMode, useTheme } from "@/components/CopyUiProvider";

import styles from "./breadcrumb-item.module.scss";

type BreadcrumbItemProps = {
  /** Is this item the current active item? */
  current?: boolean;

  children: React.ReactNode;
};

const BreadcrumbItem: FC<BreadcrumbItemProps> = (props) => {
  const { children, current = false } = props;

  const theme = useTheme();
  const jss = useJss();
  const mode = useMode();

  const currentColor =
    mode === "dark" ? theme.colors.gray["100"] : theme.colors.gray["900"];
  const inactiveColor =
    mode === "dark" ? theme.colors.gray["500"] : theme.colors.gray["600"];
  const color = current ? currentColor : inactiveColor;
  const stx = jss.hash({
    "--breadcrumbItem-color": color,
  });

  return <li className={classNames(styles.breadcrumbItem, stx)}>{children}</li>;
};

BreadcrumbItem.displayName = "Breadcrumb.Item";

export { BreadcrumbItem };
