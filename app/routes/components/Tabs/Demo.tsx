import { useState } from "react";

import { Flex } from "@/components/Flex";
import { Tabs } from "@/components/Tabs";
import { useTheme } from "@/components/ThemeProvider";

export function Demo() {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState("tab1");

  const containerStyle = {
    backgroundColor: "white",
    border: `1px solid ${theme.colors.gray["200"]}`,
    borderRadius: "0.5rem",
    width: "30rem",
  };

  const tabsStyle = {
    borderBottom: `1px solid ${theme.colors.gray["200"]}`,
  };

  return (
    <Flex dir="column" style={containerStyle}>
      <Tabs value={activeTab} onValueChange={setActiveTab} style={tabsStyle}>
        <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
      </Tabs>
      {activeTab === "tab1" && (
        <div style={{ padding: "1rem" }}>Content for Tab 1</div>
      )}
      {activeTab === "tab2" && (
        <div style={{ padding: "1rem" }}>Content for Tab 2</div>
      )}
      {activeTab === "tab3" && (
        <div style={{ padding: "1rem" }}>Content for Tab 3</div>
      )}
    </Flex>
  );
}
