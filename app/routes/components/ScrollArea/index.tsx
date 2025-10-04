import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import { Demo } from "./Demo";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "ScrollArea | Copy UI" },
    { name: "description", content: "The ScrollArea component from Copy UI." },
  ];
}

export default function ScrollAreaPage() {
  return (
    <ComponentTemplate component="ScrollArea">
      <Section
        title="ScrollArea"
        demoAndCode={[<Demo key="demo" />, demoSourceCode]}
        sourceCode={sourceCode}
        changelog={changelog}
      />
    </ComponentTemplate>
  );
}
