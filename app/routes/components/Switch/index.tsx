import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";

import type { Route } from "./+types/index";

import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Switch | Copy UI" },
    { name: "description", content: "The Switch component from Copy UI." },
  ];
}

export default function SwitchPage() {
  return (
    <ComponentTemplate component="Switch">
      <Section.Root title="Switch">
        <Section.Demo node={<Demo01 />} code={demo01SourceCode} />
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
