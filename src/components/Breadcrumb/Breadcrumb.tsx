import type { CSSProperties, FC } from "react";

import { useTheme } from "@/components/ThemeProvider";

import styles from "./Breadcrumb.module.scss";

// Breadcrumb.Item
// =============================================================================

type BreadcrumbItemProps = {
  children: React.ReactNode;
  current?: boolean;
};

const BreadcrumbItem: FC<BreadcrumbItemProps> = (props) => {
  const { children, current = false } = props;

  const theme = useTheme();

  const color = current ? theme.colors.gray["900"] : theme.colors.gray["600"];
  const computedStyle = {
    "--breadcrumb-item-color": color,
  } as CSSProperties;

  return (
    <li className={styles.breadcrumbItem} style={computedStyle}>
      {children}
    </li>
  );
};

// Breadcrumb.Sep
// =============================================================================

type BreadcrumbSepProps = object;

const BreadcrumbSep: FC<BreadcrumbSepProps> = () => {
  const theme = useTheme();

  const computedStyle = {
    "--breadcrumb-sep-color": theme.colors.gray["500"],
  } as CSSProperties;

  return (
    <li className={styles.breadcrumbSep} style={computedStyle}>
      /
    </li>
  );
};

// Breadcrumb
// =============================================================================

type BreadcrumbProps = {
  children?: React.ReactNode;
};

type BreadcrumbComponent = FC<BreadcrumbProps> & {
  Item: typeof BreadcrumbItem;
  Sep: typeof BreadcrumbSep;
};

const Breadcrumb: BreadcrumbComponent = (props: BreadcrumbProps) => {
  const { children } = props;

  return <ol className={styles.breadcrumb}>{children}</ol>;
};

Breadcrumb.displayName = "Breadcrumb";

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Sep = BreadcrumbSep;

// Exports
// =============================================================================

export { Breadcrumb };
