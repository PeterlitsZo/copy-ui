import { useState } from "react";

import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout";

import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/demo_01";
import demo01SourceCode from "./demos/demo_01.source_code.codegen";
import Demo02 from "./demos/demo_02";
import demo02SourceCode from "./demos/demo_02.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta() {
  return [
    { title: "Typography | Copy UI" },
    { name: "description", content: "The Typography component from Copy UI." },
  ];
}

export default function TypographyPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="Typography"
        desc="A flexible set of typographic components for consistent text styling."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <DocLayout.Live node={<Demo01 />} code={demo01SourceCode} />
          <Typography.H2>Examples</Typography.H2>
          <Typography.H3>Changelog list</Typography.H3>
          <DocLayout.Live node={<Demo02 />} code={demo02SourceCode} />
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
