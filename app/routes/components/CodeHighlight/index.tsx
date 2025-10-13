import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";

import type { Route } from "./+types/index";

import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "CodeHighlight | Copy UI" },
    {
      name: "description",
      content: "The CodeHighlight component from Copy UI.",
    },
  ];
}

export default function CodeHighlightPage() {
  return (
    <ComponentTemplate component="CodeHighlight">
      <Section.Root title="CodeHighlight">
        <Section.Demo node={<Demo01 />} code={demo01SourceCode} />
        <Typography.H2>See Also</Typography.H2>
        <Typography.Ul>
          <Typography.Li>CodeBlock.</Typography.Li>
        </Typography.Ul>
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
