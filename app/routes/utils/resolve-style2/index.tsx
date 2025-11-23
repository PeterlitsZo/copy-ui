import { useState } from "react";
import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout";
import changelog from "./changelog.codegen";
import sourceCode from "./source-code.codegen";

export function meta() {
  return [
    { title: "resolve-style2 | Copy UI" },
    {
      name: "description",
      content: "resolve-style2 in Copy UI.",
    },
  ];
}

export default function ResolveStyle2Page() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="resolve-style2"
        desc="The helper to calculate styles at runtime."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <Typography.CodeBlock
            withLineNumbers
            code={sourceCode}
            lang="typescript"
          />
        </DocLayout.Content>
      )}
      {tabsValue === "changelog" && (
        <DocLayout.Content>
          <DocLayout.Changelog changelog={changelog} />
        </DocLayout.Content>
      )}
    </DocLayout>
  );
}
