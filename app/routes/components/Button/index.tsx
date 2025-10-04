import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import { Demo } from "./Demo";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Button | Copy UI" },
    { name: "description", content: "The Button component from Copy UI." },
  ];
}

export default function ButtonPage() {
  return (
    <ComponentTemplate component="Button">
      <Section
        title="Button"
        demoAndCode={[<Demo />, demoSourceCode]}
        sourceCode={sourceCode}
        changelog={changelog}
      />
    </ComponentTemplate>
  );
}
