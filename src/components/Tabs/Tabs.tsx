import classNames from "classnames";
import { merge } from "es-toolkit";
import type { ComponentProps, CSSProperties, FC } from "react";
import { createContext, useContext, useState } from "react";
import tinycolor from "tinycolor2";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./Tabs.module.scss";

// Context
// =============================================================================

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  variant: "default";
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

// Tabs.Tab
// =============================================================================

export type TabProps = ComponentProps<"button"> & {
  value: string;
};

const Tab: FC<TabProps> = (props) => {
  const { className, style, children, value, ...rest } = props;
  const { activeTab, setActiveTab, variant } = useTabsContext();
  const theme = useTheme();

  const isActive = activeTab === value;

  const computedStyle = mergeStyles([
    variant === "default" &&
      ({
        "--tab-bg": "transparent",
        "--tab-color": isActive
          ? theme.colors.blue["800"]
          : theme.colors.gray["600"],
      } as CSSProperties),

    {
      "--tab-padding-x": "0.375rem",
      "--tab-padding-y": "0.375rem",
      "--tab-radius": "0.375rem",
      "--tab-border-color": isActive ? theme.colors.blue["800"] : "transparent",
      "--tab-font-size": "1.25rem",
      "--tab-hover-wrapper-bg": tinycolor(theme.colors.gray["100"])
        .setAlpha(0.7)
        .toRgbString(),
      "--tab-wrapper-padding-x": "0.75rem",
      "--tab-wrapper-padding-y": "0.125rem",
    } as CSSProperties,
    style,
  ]);

  return (
    <button
      className={classNames(
        styles.tab,
        { [styles.active]: isActive },
        className,
      )}
      style={computedStyle}
      onClick={() => setActiveTab(value)}
      type="button"
      role="tab"
      aria-selected={isActive}
      {...rest}
    >
      <span className={styles.wrapper}>{children}</span>
    </button>
  );
};

// Tabs
// =============================================================================

export type TabsProps = ComponentProps<"div"> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: "default";
  children: React.ReactNode;
};

type TabsComponent = FC<TabsProps> & {
  Tab: typeof Tab;
};

const Tabs: TabsComponent = (props) => {
  const {
    className,
    style,
    children,
    defaultValue = "",
    value,
    onValueChange,
    variant = "default",
    ...rest
  } = props;

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

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={classNames(styles.tabs, className)}
        style={style}
        role="tablist"
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.Tab = Tab;

export { Tabs };

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
