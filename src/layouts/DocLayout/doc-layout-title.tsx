import type { CSSProperties, FC } from "react";

import { useTheme } from "@/components/CopyUiProvider";
import { Tabs } from "@/components/Tabs";
import { Typography } from "@/components/Typography";

import styles from "./doc-layout-title.module.scss";

type DocLayoutTitleProps = {
  title: string;
  desc: string;
  tabsValue: string;
  tabs: { name: string; label: string }[];
  onTabsValueChange: (tab: string) => void;
};

const DocLayoutTitle: FC<DocLayoutTitleProps> = (props) => {
  const { title, desc, tabsValue, tabs, onTabsValueChange } = props;

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
      <Tabs
        value={tabsValue}
        onValueChange={onTabsValueChange}
        className={styles.docLayoutTitleWrapper}
      >
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.name} value={tab.name}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
};

DocLayoutTitle.displayName = "DocLayout.Title";

export { DocLayoutTitle };
