import classNames from "classnames";
import type { FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { resolveStyle2 } from "@/utils/resolve-style2";

import { useTabsContext } from "./tab-context";
import type { TabsTabProps } from "./tabs-tab";
import styles from "./tabs-tab-default.module.css";

const TabsTabDefault: FC<TabsTabProps & { size: "md" | "lg" }> = (props) => {
  const { className, children, value, size, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const { activeTab, setActiveTab } = useTabsContext();

  const isActive = activeTab === value;

  const baseStx = jss.hash({
    "--tab-color": theme.colors.gray["550"],

    "--tab-active-bdBottomColor": theme.colors.blue["650"],
    "--tab-active-color": theme.colors.blue["650"],
    "--tab-hover-contentBgColor": theme.colors.gray["050"],
  });

  const stx = useTabsTabDefaultStx(size);

  return (
    <button
      className={classNames(styles.tabsTabDefault, baseStx, stx, className)}
      onClick={() => setActiveTab(value)}
      type="button"
      role="tab"
      aria-selected={isActive}
      data-active={isActive ? "true" : undefined}
      {...rest}
    >
      <span className={styles.tabContent}>{children}</span>
    </button>
  );
};

TabsTabDefault.displayName = "Tabs.TabDefault";

function useTabsTabDefaultStx(size: "md" | "lg") {
  const jss = useJss();

  const styles = resolveStyle2({
    size: {
      md: {
        "--tab-px": "0rem",
        "--tab-pt": "0.125rem",
        "--tab-pb": "0.25rem",
        "--tab-fontSize": "1rem",
        "--tabContent-px": "0.375rem",
        "--tabContent-py": "0.125rem",
      },
      lg: {
        "--tab-px": "1px",
        "--tab-pt": "0.25rem",
        "--tab-pb": "0.375rem",
        "--tab-fontSize": "1.25rem",
        "--tabContent-px": "0.5rem",
        "--tabContent-py": "0.25rem",
      },
    },
  });

  return jss.hash(styles({ size }));
}

export { TabsTabDefault };
