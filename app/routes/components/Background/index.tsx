import type { Route } from "./+types/index";

import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";

import { sourceCode } from "./source_code.codegen";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { changelog } from "./changelog.codegen";

import { Demo } from "./Demo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Background | Copy UI" },
    { name: "description", content: "The Background component from Copy UI." },
  ];
}

export default function BackgroundPage() {
  return (
    <ComponentTemplate component="Background">
      <Section
        title="Background"
        demoAndCode={[<Demo />, demoSourceCode]}
        sourceCode={sourceCode}
        changelog={changelog}
      />
    </ComponentTemplate>
  );
}