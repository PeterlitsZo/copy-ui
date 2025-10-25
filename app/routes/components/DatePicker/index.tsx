import { useState } from "react";

import { DocLayout } from "@/layouts/DocLayout";

import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "DatePicker | Copy UI" },
    { name: "description", content: "The DatePicker component from Copy UI." },
  ];
}

export default function DatePickerPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="DatePicker"
        desc="Use me to pick a datetime."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <DocLayout.Live node={<Demo01 />} code={demo01SourceCode} />
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
