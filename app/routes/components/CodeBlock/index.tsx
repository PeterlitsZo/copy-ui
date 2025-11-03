import { useState } from "react";
import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout/doc-layout";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import Demo02 from "./demos/Demo02";
import demo02SourceCode from "./demos/Demo02.source_code.codegen";
import Demo03 from "./demos/Demo03";
import demo03SourceCode from "./demos/Demo03.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "CodeBlock | Copy UI" },
    {
      name: "description",
      content: "The CodeBlock component from Copy UI.",
    },
  ];
}

export default function CodeBlockPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="CodeBlock"
        desc="For displaying code snippets."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <DocLayout.Live node={<Demo01 />} code={demo01SourceCode} />
          <Typography.H2>Examples</Typography.H2>
          <Typography.H3>With Title</Typography.H3>
          <DocLayout.Live node={<Demo02 />} code={demo02SourceCode} />
          <Typography.H3>Without height or maxHeight</Typography.H3>
          <DocLayout.Live node={<Demo03 />} code={demo03SourceCode} />
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
