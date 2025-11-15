import type { CSSProperties, FC } from "react";

import { useTheme } from "@/components/CopyUiProvider";
import { Typography } from "@/components/Typography";

import styles from "./doc-layout-title-without-tabs.module.scss";

type DocLayoutTitleWithoutTabsProps = {
  title: string;
  desc: string;
};

const DocLayoutTitleWithoutTabs: FC<DocLayoutTitleWithoutTabsProps> = (
  props,
) => {
  const { title, desc } = props;

  const theme = useTheme();

  const stx = {
    "--title-border-bottom": theme.colors.gray["300"],
    "--title-desc-color": theme.colors.gray["600"],
  } as CSSProperties;

  return (
    <div className={styles.docLayoutTitle} style={stx}>
      <Typography className={styles.docLayoutTitleWrapper}>
        <Typography.H1>{title}</Typography.H1>
        <Typography.P className={styles.docLayoutTitleDesc}>
          {desc}
        </Typography.P>
      </Typography>
    </div>
  );
};

DocLayoutTitleWithoutTabs.displayName = "DocLayout.TitleWithoutTabs";

export { DocLayoutTitleWithoutTabs };
