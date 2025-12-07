import { useState } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { Field } from "@/components/Field";
import { Flex } from "@/components/Flex";
import { Paper } from "@/components/Paper";
import { Tabs } from "@/components/Tabs";
import { Typography } from "@/components/Typography";
import ContentForChangelog from "./content-for-changelog.mdx";
import ContentForDocument from "./content-for-document.mdx";
import ContentForSourceCode from "./content-for-source-code.mdx";

export default function Demo() {
  const theme = useTheme();
  const jss = useJss();

  const [activeTab, setActiveTab] = useState("tab1");
  const [variant, setVariant] = useState<"default" | "enclosed">("default");
  const [size, setSize] = useState<"md" | "lg">("md");

  const containerStx = jss.hash({
    backgroundColor: "white",
    width: "35rem",
  });

  const tabsStx = jss.hash({
    paddingLeft: variant === "default" ? "1rem" : "1rem",
    paddingTop: variant === "default" ? "0.75rem" : "1.125rem",
    borderBottom:
      variant === "default"
        ? `1px solid ${theme.colors.gray["200"]}`
        : undefined,
  });

  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "enclosed", label: "Enclosed" },
  ];

  const sizeOptions = [
    { value: "md", label: "Medium (md)" },
    { value: "lg", label: "Large (lg)" },
  ];

  return (
    <Flex gap="1rem" dir="column">
      <Paper withBorder radius="md">
        <Flex dir="column" className={containerStx}>
          <div className={tabsStx}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              variant={variant}
              size={size}
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
      <Flex dir="column" gap="1rem">
        <Field>
          <Field.Label>Variant</Field.Label>
          <Field.Select
            value={variant}
            options={variantOptions}
            onChange={(value) => setVariant(value as "default" | "enclosed")}
          />
        </Field>
        <Field>
          <Field.Label>Size</Field.Label>
          <Field.Select
            value={size}
            options={sizeOptions}
            onChange={(value) => setSize(value as "md" | "lg")}
          />
        </Field>
      </Flex>
    </Flex>
  );
}
