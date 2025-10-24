import { useState } from "react";

import { Markdown } from "@/components/Markdown";
import { DocLayout } from "@/layouts/DocLayout/doc-layout";

import { changelog } from "./changelog.codegen";
import doc from "./doc.md?raw";
import { sourceCode } from "./source_code.codegen";

export function meta() {
  return [
    { title: "InputBase | Copy UI" },
    { name: "description", content: "The InputBase component from Copy UI." },
  ];
}

export default function InputBasePage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="InputBase"
        desc="The base component for input-like components."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <Markdown>{doc}</Markdown>
        </DocLayout.Content>
      )}
      {tabsValue === "source" && (
        <DocLayout.Content>
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
