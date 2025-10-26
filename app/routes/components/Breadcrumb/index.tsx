import { useState } from "react";

import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout";

import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01sourceCode from "./demos/Demo01.source_code.codegen";
import Demo02 from "./demos/Demo02";
import demo02sourceCode from "./demos/Demo02.source_code.codegen";
import Demo03 from "./demos/Demo03";
import demo03sourceCode from "./demos/Demo03.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Breadcrumb | Copy UI" },
    { name: "description", content: "The Breadcrumb component from Copy UI." },
  ];
}

export default function BreadcrumbPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="Breadcrumb"
        desc="Step by step."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <DocLayout.Live node={<Demo01 />} code={demo01sourceCode} />
          <Typography.H2>Examples</Typography.H2>
          <Typography.H3>With different size</Typography.H3>
          <DocLayout.Live node={<Demo02 />} code={demo02sourceCode} />
          <Typography.P>
            You can use the prop <Typography.Code>size</Typography.Code> to
            change the size of the breadcrumb items.
          </Typography.P>
          <Typography.H3>With custom separator</Typography.H3>
          <DocLayout.Live node={<Demo03 />} code={demo03sourceCode} />
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
