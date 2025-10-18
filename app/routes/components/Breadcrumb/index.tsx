import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";

import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01sourceCode from "./demos/Demo01.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Breadcrumb | Copy UI" },
    { name: "description", content: "The Breadcrumb component from Copy UI." },
  ];
}

export default function BreadcrumbPage() {
  return (
    <ComponentTemplate component="Breadcrumb">
      <Section.Root title="Breadcrumb">
        <Section.Demo node={<Demo01 />} code={demo01sourceCode} />
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
