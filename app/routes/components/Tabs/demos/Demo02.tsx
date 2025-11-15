import { useState } from "react";
import { useJss } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { Markdown } from "@/components/Markdown";
import { Paper } from "@/components/Paper";
import { Tabs } from "@/components/Tabs";

export default function Demo() {
  const jss = useJss();

  const [activeTab, setActiveTab] = useState("tab1");

  const containerStx = jss.hash({
    backgroundColor: "white",
    width: "30rem",
  });

  const tabsContainerStx = jss.hash({
    paddingLeft: "1rem",
    paddingTop: "1rem",
  });

  return (
    <Paper withBorder radius="md">
      <Flex dir="column" className={containerStx}>
        <div className={tabsContainerStx}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            variant="enclosed"
          >
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs>
        </div>
        {activeTab === "tab1" && (
          <div style={{ padding: "1.25rem" }}>
            <Markdown>{contentForTab1}</Markdown>
          </div>
        )}
        {activeTab === "tab2" && (
          <div style={{ padding: "1.25rem" }}>
            <Markdown>{contentForTab2}</Markdown>
          </div>
        )}
        {activeTab === "tab3" && (
          <div style={{ padding: "1.25rem" }}>
            <Markdown>{contentForTab3}</Markdown>
          </div>
        )}
      </Flex>
    </Paper>
  );
}

const contentForTab1 = `\
### Welcome to Tab 1

You can click “Tab 2”.
`;

const contentForTab2 = `\
### Welcome to Tab 2

You can click “Tab 3”.
`;

const contentForTab3 = `\
### Welcome to Tab 3

You can click “Tab 1”.
`;
