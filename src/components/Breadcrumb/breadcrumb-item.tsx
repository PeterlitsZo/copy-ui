import classNames from "classnames";
import type { FC } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";

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

  const color = current ? theme.colors.gray["900"] : theme.colors.gray["600"];
  const stx = jss.hash({
    "--breadcrumb-item-color": color,
  });

  return <li className={classNames(styles.breadcrumbItem, stx)}>{children}</li>;
};

BreadcrumbItem.displayName = "Breadcrumb.Item";

export { BreadcrumbItem };
