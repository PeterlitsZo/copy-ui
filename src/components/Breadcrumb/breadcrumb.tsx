import classNames from "classnames";
import type { FC } from "react";
import { useJss } from "../CopyUiProvider";
import styles from "./breadcrumb.module.scss";
import { BreadcrumbItem } from "./breadcrumb-item";
import { BreadcrumbSep } from "./breadcrumb-sep";

type BreadcrumbProps = {
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
};

type BreadcrumbComponent = FC<BreadcrumbProps> & {
  Item: typeof BreadcrumbItem;
  Sep: typeof BreadcrumbSep;
};

const Breadcrumb: BreadcrumbComponent = (props: BreadcrumbProps) => {
  const { size = "md", children } = props;

  const jss = useJss();

  const stx = jss.hash({
    "--breadcrumb-font-size": {
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
    }[size],
  });

  return <ol className={classNames(styles.breadcrumb, stx)}>{children}</ol>;
};

Breadcrumb.displayName = "Breadcrumb";

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Sep = BreadcrumbSep;

export { Breadcrumb };
