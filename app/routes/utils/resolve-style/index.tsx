import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout";

import sourceCode from "./source-code.codegen";

export function meta() {
  return [
    { title: "resolve-style | Copy UI" },
    {
      name: "description",
      content: "resolve-style in Copy UI.",
    },
  ];
}

export default function ResolveStylePage() {
  return (
    <DocLayout>
      <DocLayout.TitleWithoutTabs
        title="resolve-style"
        desc="Calculate styles at runtime."
      />
      <DocLayout.Content>
        <Typography.CodeBlock
          withLineNumbers
          code={sourceCode}
          lang="typescript"
        />
      </DocLayout.Content>
    </DocLayout>
  );
}
