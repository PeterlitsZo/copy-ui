import { useState } from "react";

import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import Demo02 from "./demos/Demo02";
import demo02SourceCode from "./demos/Demo02.source_code.codegen";
import Demo03 from "./demos/Demo03";
import demo03SourceCode from "./demos/Demo03.source_code.codegen";
import Demo04 from "./demos/Demo04";
import demo04SourceCode from "./demos/Demo04.source_code.codegen";
import Demo05 from "./demos/Demo05";
import demo05SourceCode from "./demos/Demo05.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Input | Copy UI" },
    { name: "description", content: "The Input component from Copy UI." },
  ];
}

export default function InputPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="Input"
        desc="Input something..."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <DocLayout.Live node={<Demo01 />} code={demo01SourceCode} />
          <Typography.H2>Examples</Typography.H2>
          <Typography.H3>Different variants</Typography.H3>
          <DocLayout.Live node={<Demo02 />} code={demo02SourceCode} />
          <Typography.H3>Left & right sections</Typography.H3>
          <DocLayout.Live node={<Demo03 />} code={demo03SourceCode} />
          <Typography.H3>Disabled state</Typography.H3>
          <DocLayout.Live node={<Demo04 />} code={demo04SourceCode} />
          <Typography.H3>Different sizes</Typography.H3>
          <DocLayout.Live node={<Demo05 />} code={demo05SourceCode} />
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
