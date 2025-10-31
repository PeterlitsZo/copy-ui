import classNames from "classnames";
import type { ComponentProps, FC } from "react";
import { useState } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { resolveStyle } from "@/utils/resolve-style";
import { useTheme } from "../ThemeProvider";
import styles from "./Tabs.module.scss";
import { TabsContext, type TabsContextValue } from "./tab-context";
import { TabsTab } from "./tabs-tab";

export type TabsProps = ComponentProps<"div"> & {
  defaultValue?: string;
  value?: string;
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
  };

  const tabsStx = jss.hash(
    resolveStyle({
      base: {},
      variants: {
        variant: {
          default: {
            "--tabs-bg-color": "transparent",
            "--tabs-width": "auto",
            "--tabs-border-radius": "auto",
          },
          enclosed: {
            "--tabs-bg-color": theme.colors.gray["100"],
            "--tabs-width": "fit-content",
            "--tabs-border-radius": "0.75rem",
            "--tabs-padding": "0.25rem",
          },
        },
      },
      cls: { variant: variant },
    }),
  );

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

export { Tabs };
