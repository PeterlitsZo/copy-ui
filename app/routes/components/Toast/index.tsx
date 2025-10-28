import { useState } from "react";

import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout";

import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Toast | Copy UI" },
    { name: "description", content: "The Toast component from Copy UI." },
  ];
}

export default function ToastPage() {
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="Toast"
        desc="Show brief messages to users."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <DocLayout.Live node={<Demo01 />} code={demo01SourceCode} />
          <Typography.P>
            You can use the <Typography.Code>useToast</Typography.Code> hook to
            add toasts. The toast's context and container are provided by the
            <Typography.Code>Toast.Context</Typography.Code> and{" "}
            <Typography.Code>Toast.Container</Typography.Code> components. You
            should not need to use them directly because they are already
            rendered by the <Typography.Code>CopyUiProvider</Typography.Code>{" "}
            component.
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
