import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";

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
    <ComponentTemplate idx="/v0/utils/jss">
      <Section.Root title="jss">
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
