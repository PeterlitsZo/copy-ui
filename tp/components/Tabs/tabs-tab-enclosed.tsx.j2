import classNames from "classnames";
import type { FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { resolveStyle2 } from "@/utils/resolve-style2";

import { useTabsContext } from "./tab-context";
import type { TabsTabProps } from "./tabs-tab";
import styles from "./tabs-tab-enclosed.module.css";

const TabsTabEnclosed: FC<TabsTabProps & { size: "md" | "lg" }> = (props) => {
  const { className, children, value, size, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const { activeTab, setActiveTab } = useTabsContext();

  const isActive = activeTab === value;

  const baseStx = jss.hash({
    "--tab-bgColor": "transparent",
    "--tab-color": theme.colors.gray["600"],
    "--tab-bdRadius": "0.5rem",
    "--tab-bdWidth": "1px",
    "--tab-bdStyle": "solid",
    "--tab-bdColor": "transparent",

    "--tab-active-bgColor": "white",
    "--tab-active-bdWidth": "1px",
    "--tab-active-bdStyle": "solid",
    "--tab-active-bdColor": theme.colors.gray["300"],
  });

  const stx = useTabsTabEnclosedStx(size);

  return (
    <button
      className={classNames(styles.tabsTabEnclosed, baseStx, stx, className)}
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

TabsTabEnclosed.displayName = "Tabs.TabEnclosed";

function useTabsTabEnclosedStx(size: "md" | "lg") {
  const jss = useJss();

  const styles = resolveStyle2({
    size: {
      md: {
        "--tab-px": "0.625rem",
        "--tab-py": "0.125rem",
        "--tab-fontSize": "1rem",
      },
      lg: {
        "--tab-px": "0.75rem",
        "--tab-py": "0.25rem",
        "--tab-fontSize": "1.25rem",
      },
    },
  });

  return jss.hash(styles({ size }));
}

export { TabsTabEnclosed };
