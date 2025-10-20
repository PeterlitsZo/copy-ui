import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";

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
    <ComponentTemplate idx="/v0/utils/resolve-style">
      <Section.Root title="resolve-style">
        <Typography.P>
          <Typography.CodeBlock
            withLineNumbers
            code={sourceCode}
            lang="typescript"
          />
        </Typography.P>
      </Section.Root>
    </ComponentTemplate>
  );
}
