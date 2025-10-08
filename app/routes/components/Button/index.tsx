import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";
import { Typography } from "@/components/Typography";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import { Demo } from "./Demo";
import { demoSourceCode } from "./Demo_source_code.codegen";
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
        <Section.Demo node={<Demo />} code={demoSourceCode} />
        <Typography.H2 mt="1.5rem" mb="1rem">
          Usage
        </Typography.H2>
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
