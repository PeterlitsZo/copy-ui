import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import { Demo } from "./Demo";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "ButtonGroup | Copy UI" },
    { name: "description", content: "The ButtonGroup component from Copy UI." },
  ];
}

export default function ButtonGroupPage() {
  return (
    <ComponentTemplate component="ButtonGroup">
      <Section.Root title="ButtonGroup">
        <Section.Demo node={<Demo />} code={demoSourceCode} />
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
