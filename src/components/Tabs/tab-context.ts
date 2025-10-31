import { createContext, useContext } from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  variant: "default" | "enclosed";
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

export { TabsContext, useTabsContext, type TabsContextValue };
