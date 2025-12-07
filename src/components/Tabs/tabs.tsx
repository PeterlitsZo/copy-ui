import classNames from "classnames";
import type { ComponentProps, FC } from "react";
import { useState } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { resolveStyle2 } from "@/utils/resolve-style2";

import { TabsContext, type TabsContextValue } from "./tab-context";
import styles from "./tabs.module.css";
import { TabsTab } from "./tabs-tab";

export type TabsProps = ComponentProps<"div"> & {
  defaultValue?: string;
  value?: string;
  size?: "md" | "lg";
  onValueChange?: (value: string) => void;
  variant?: "default" | "enclosed";
  children: React.ReactNode;
};

type TabsComponent = FC<TabsProps> & {
  Tab: typeof TabsTab;
};

const Tabs: TabsComponent = (props: TabsProps) => {
  const {
    className,
    children,
    defaultValue = "",
    value,
    onValueChange,
    variant = "default",
    size = "md",
    ...rest
  } = props;

  const theme = useTheme();
  const jss = useJss();

  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value ?? internalValue;

  const setActiveTab = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const contextValue: TabsContextValue = {
    activeTab,
    setActiveTab,
    variant,
    size,
  };

  const tabsStx = useTabsStx(variant, size);

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={classNames(styles.tabs, tabsStx, className)}
        role="tablist"
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.Tab = TabsTab;

function useTabsStx(variant: "default" | "enclosed", size: "md" | "lg") {
  const jss = useJss();
  const theme = useTheme();

  const styles = resolveStyle2({
    variant: {
      default: {
        "--tabs-bgColor": "transparent",
        "--tabs-w": "auto",
        "--tabs-bdRadius": "auto",
        "--tabs-gap": "0.75rem",
      },
      enclosed: {
        "--tabs-bgColor": theme.colors.gray["100"],
        "--tabs-w": "fit-content",
        "--tabs-bdRadius": "0.75rem",
        "--tabs-p": "0.25rem",
        "--tabs-gap": "0.125rem",
      },
    },
    variantAndSize: {
      default_md: {
        "--tabs-gap": "0.5rem",
      },
      default_lg: {
        "--tabs-gap": "1rem",
      },
      enclosed_md: {
        "--tabs-gap": "0.125rem",
      },
      enclosed_lg: {
        "--tabs-gap": "0.25rem",
      },
    },
  });

  return jss.hash(
    styles({
      variant,
      variantAndSize: `${variant}_${size}`,
    }),
  );
}

export { Tabs };
