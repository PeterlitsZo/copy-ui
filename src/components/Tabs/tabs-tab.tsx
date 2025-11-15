import classNames from "classnames";
import type { ComponentProps, FC } from "react";
import tinycolor from "tinycolor2";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import { useTabsContext } from "./tab-context";
import styles from "./tabs-tab.module.scss";

export type TabsTabProps = ComponentProps<"button"> & {
  value: string;
};

const TabsTabDefault: FC<TabsTabProps> = (props) => {
  const { className, children, value, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const { activeTab, setActiveTab } = useTabsContext();

  const isActive = activeTab === value;

  const stx = jss.hash({
    "--tab-radius": "0.375rem",
    "--tab-font-size": "1.25rem",
    "--tab-hover-wrapper-bg": tinycolor(theme.colors.gray["100"])
      .setAlpha(0.5)
      .toRgbString(),
    "--tab-wrapper-padding-x": "0.5rem",
    "--tab-wrapper-padding-y": "0.125rem",
    "--tab-bg": "transparent",
    "--tab-color": theme.colors.gray["600"],
    "--tab-active-color": theme.colors.blue["800"],
    "--tab-border-bottom-width": "0.125rem",
    "--tab-border-bottom-style": "solid",
    "--tab-border-bottom-color": "transparent",
    "--tab-active-border-bottom-color": theme.colors.blue["800"],
    "--tab-padding-x": "0",
    "--tab-padding-y": "0.375rem",
  });

  return (
    <button
      className={classNames(styles.tabsTabDefault, stx, className)}
      onClick={() => setActiveTab(value)}
      type="button"
      role="tab"
      aria-selected={isActive}
      data-active={isActive ? "true" : undefined}
      {...rest}
    >
      <span className={styles.wrapper}>{children}</span>
    </button>
  );
};

const TabsTabEnclosed: FC<TabsTabProps> = (props) => {
  const { className, children, value, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const { activeTab, setActiveTab } = useTabsContext();

  const isActive = activeTab === value;

  const stx = jss.hash({
    "--tab-radius": "0.375rem",
    "--tab-font-size": "1.25rem",
    "--tab-hover-wrapper-bg": tinycolor(theme.colors.gray["100"])
      .setAlpha(0.7)
      .toRgbString(),
    "--tab-wrapper-padding-x": "0.75rem",
    "--tab-wrapper-padding-y": "0.125rem",
    "--tab-bg": "transparent",
    "--tab-active-bg": "white",
    "--tab-color": theme.colors.gray["600"],
    "--tab-padding-x": "0.75rem",
    "--tab-padding-y": "0.125rem",
    "--tab-border-radius": "0.5rem",
    "--tab-border-width": "1px",
    "--tab-border-style": "solid",
    "--tab-border-color": "transparent",
    "--tab-active-border-width": "1px",
    "--tab-active-border-style": "solid",
    "--tab-active-border-color": theme.colors.gray["300"],
  });

  return (
    <button
      className={classNames(styles.tabsTabEnclosed, stx, className)}
      onClick={() => setActiveTab(value)}
      type="button"
      role="tab"
      aria-selected={isActive}
      data-active={isActive ? "true" : undefined}
      {...rest}
    >
      {children}
    </button>
  );
};

const TabsTab: FC<TabsTabProps> = (props) => {
  const { variant } = useTabsContext();

  if (variant === "default") {
    return <TabsTabDefault {...props} />;
  } else if (variant === "enclosed") {
    return <TabsTabEnclosed {...props} />;
  } else {
    throw new Error(`Unknown Tabs variant: ${variant}`);
  }
};

TabsTab.displayName = "Tabs.Tab";

export { TabsTab };
