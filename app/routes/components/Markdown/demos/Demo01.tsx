import { useState } from "react";

import { CodeBlock } from "@/components/CodeBlock";
import { useJss } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { Markdown } from "@/components/Markdown";
import { Paper } from "@/components/Paper";
import { Tabs } from "@/components/Tabs";

import content from "./content01.md?raw";

export default function Demo() {
  const [tabValue, setTabValue] = useState("markdown");

  const jss = useJss();
  const stx = jss.hash({
    width: "37rem",
  });

  return (
    <Paper className={stx} radius="md" withBorder withPadding>
      <Flex dir="column" gap="1rem">
        <Tabs value={tabValue} onValueChange={setTabValue} variant="enclosed">
          <Tabs.Tab value="markdown">Markdown</Tabs.Tab>
          <Tabs.Tab value="code">Raw</Tabs.Tab>
        </Tabs>
        {tabValue === "markdown" && <Markdown>{content}</Markdown>}
        {tabValue === "code" && <CodeBlock code={content} lang="markdown" />}
      </Flex>
    </Paper>
  );
}
