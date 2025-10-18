import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";

import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Background | Copy UI" },
    { name: "description", content: "The Background component from Copy UI." },
  ];
}

export default function BackgroundPage() {
  return (
    <ComponentTemplate component="Background">
      <Section.Root title="Background">
        <Section.Demo node={<Demo01 />} code={demo01SourceCode} />
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
