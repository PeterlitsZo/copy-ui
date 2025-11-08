import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout";
import sourceCode from "./source-code.codegen";

export function meta() {
  return [
    { title: "jss | Copy UI" },
    {
      name: "description",
      content: "jss in Copy UI.",
    },
  ];
}

export default function JssPage() {
  return (
    <DocLayout>
      <DocLayout.TitleWithoutTabs
        title="jss"
        desc="A simple CSS-in-JS solution."
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
