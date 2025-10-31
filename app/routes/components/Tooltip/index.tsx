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
    { title: "Tooltip | Copy UI" },
    { name: "description", content: "The Tooltip component from Copy UI." },
  ];
}

export default function TooltipPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="Tooltip"
        desc="Display informative text when users hover over an element."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <DocLayout.Live node={<Demo01 />} code={demo01SourceCode} />
          <Typography.H2>Examples</Typography.H2>
          <Typography.H3>Delayed tooltip on hover</Typography.H3>
          <DocLayout.Live node={<Demo02 />} code={demo02SourceCode} />
          <Typography.P>
            You can use <Typography.Code>setTimeout</Typography.Code> to delay
            the tooltip.
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
