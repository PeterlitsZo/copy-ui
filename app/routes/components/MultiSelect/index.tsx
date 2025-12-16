import { useState } from "react";

import { DocLayout } from "@/layouts/DocLayout/doc-layout";

import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Doc from "./doc.mdx";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "MultiSelect | Copy UI" },
    { name: "description", content: "The MultiSelect component from Copy UI." },
  ];
}

export default function MultiSelectPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="MultiSelect"
        desc="Select multiple options."
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
