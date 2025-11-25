import { useState } from "react";

import { DocLayout } from "@/layouts/DocLayout";

import { changelog } from "./changelog.codegen";
import Doc from "./doc.mdx";
import { sourceCode } from "./source_code.codegen";

export function meta() {
  return [
    { title: "Card | Copy UI" },
    { name: "description", content: "The Card component from Copy UI." },
  ];
}

export default function CardPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="Card"
        desc="A simple container like a card."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <Doc />
        </DocLayout.Content>
      )}
      {tabsValue === "source" && (
        <DocLayout.Content variant="files">
          <DocLayout.Files files={sourceCode} />
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
