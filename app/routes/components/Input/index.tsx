import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";

import type { Route } from "./+types/index";

import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Input | Copy UI" },
    { name: "description", content: "The Input component from Copy UI." },
  ];
}

export default function InputPage() {
  return (
    <ComponentTemplate component="Input">
      <Section.Root title="Input">
        <Section.Demo node={<Demo01 />} code={demo01SourceCode} />
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
