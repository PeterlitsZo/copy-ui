import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";

import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01sourceCode from "./demos/Demo01.source_code.codegen";
import Example01 from "./demos/Example01";
import example01SourceCode from "./demos/Example01.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Button | Copy UI" },
    { name: "description", content: "The Button component from Copy UI." },
  ];
}

export default function ButtonPage() {
  return (
    <ComponentTemplate component="Button">
      <Section.Root title="Button">
        <Section.Demo node={<Demo01 />} code={demo01sourceCode} />
        <Typography.H2>Example</Typography.H2>
        <Typography.H3>With different colors</Typography.H3>
        <Section.Demo node={<Example01 />} code={example01SourceCode} />
        <Typography.H2>Usage</Typography.H2>
        <Typography.P>
          The Button component is a sample button component. It has several
          variants:
        </Typography.P>
        <Typography.Ul>
          <Typography.Li>default.</Typography.Li>
          <Typography.Li>filled.</Typography.Li>
          <Typography.Li>light.</Typography.Li>
          <Typography.Li>ghost.</Typography.Li>
        </Typography.Ul>
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
