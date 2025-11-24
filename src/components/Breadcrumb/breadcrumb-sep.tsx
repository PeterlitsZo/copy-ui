import classNames from "classnames";
import type { FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./breadcrumb-sep.module.scss";

type BreadcrumbSepProps = {
  children?: React.ReactNode;
};

const BreadcrumbSep: FC<BreadcrumbSepProps> = (props) => {
  const { children = "/" } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--breadcrumbSep-color": theme.colors.gray["500"],
  });

  return <li className={classNames(styles.breadcrumbSep, stx)}>{children}</li>;
};

BreadcrumbSep.displayName = "Breadcrumb.Sep";

export { BreadcrumbSep };
