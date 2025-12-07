import { useState } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { Paper } from "@/components/Paper";
import { Tabs } from "@/components/Tabs";
import { Typography } from "@/components/Typography";

import ContentForChangelog from "./content-for-changelog.mdx";
import ContentForDocument from "./content-for-document.mdx";
import ContentForSourceCode from "./content-for-source-code.mdx";

export default function Demo() {
  const jss = useJss();

  const [activeTab, setActiveTab] = useState("tab1");

  const containerStx = jss.hash({
    backgroundColor: "white",
    width: "35rem",
  });

  const tabsContainerStx = jss.hash({
    paddingLeft: "1rem",
    paddingTop: "1.125rem",
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
            <Tabs.Tab value="tab1">Document</Tabs.Tab>
            <Tabs.Tab value="tab2">Source Code</Tabs.Tab>
            <Tabs.Tab value="tab3">Changelog</Tabs.Tab>
          </Tabs>
        </div>
        <Typography style={{ padding: "1rem" }}>
          {activeTab === "tab1" && <ContentForDocument />}
          {activeTab === "tab2" && <ContentForSourceCode />}
          {activeTab === "tab3" && <ContentForChangelog />}
        </Typography>
      </Flex>
    </Paper>
  );
}
