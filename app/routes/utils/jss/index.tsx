import { useState } from "react";
import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout";
import changelog from "./changelog.codegen";
import sourceCode from "./source-code.codegen";

export function meta() {
  return [
    { title: "jss | Copy UI" },
    {
      name: "description",
      content: "jss in Copy UI.",
    },
  ];
}

export default function JssPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="jss"
        desc="A simple CSS-in-JS solution."
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
