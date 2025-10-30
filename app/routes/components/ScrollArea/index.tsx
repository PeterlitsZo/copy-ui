import { useState } from "react";

import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout/doc-layout";

import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import Demo02 from "./demos/Demo02";
import demo02SourceCode from "./demos/Demo02.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "ScrollArea | Copy UI" },
    { name: "description", content: "The ScrollArea component from Copy UI." },
  ];
}

export default function ScrollAreaPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="ScrollArea"
        desc="With custom scrollbar."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <DocLayout.Live node={<Demo01 />} code={demo01SourceCode} />
          <Typography.H2>Examples</Typography.H2>
          <Typography.H3>With absolute position</Typography.H3>
          <DocLayout.Live node={<Demo02 />} code={demo02SourceCode} />
          <Typography.P>
            The <Typography.Code>default</Typography.Code> variant's viewport
            just uses <Typography.Code>height: 100%;</Typography.Code> and{" "}
            <Typography.Code>width: 100%;</Typography.Code> to fill the
            container. The <Typography.Code>absolute</Typography.Code> variant
            uses absolute positioning to fill the container, which move out the
            content from the normal document flow and can help to avoid some
            layout issues.
          </Typography.P>
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
