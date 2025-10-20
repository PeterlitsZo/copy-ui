import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";

import type { Route } from "./+types/index";

import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import Example01 from "./demos/Example01";
import example01SourceCode from "./demos/Example01.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Field | Copy UI" },
    { name: "description", content: "The Field component from Copy UI." },
  ];
}

export default function FieldPage() {
  return (
    <ComponentTemplate component="Field">
      <Section.Root title="Field">
        <Section.Demo node={<Demo01 />} code={demo01SourceCode} />
        <Typography.H2>Examples</Typography.H2>
        <Typography.H3>With Error Message</Typography.H3>
        <Section.Demo node={<Example01 />} code={example01SourceCode} />
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
