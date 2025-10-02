import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";

import { sourceCode } from "./source_code.codegen";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { changelog } from "./changelog.codegen";

import { Demo } from "./Demo";

export function meta() {
  return [
    { title: "Typography | Copy UI" },
    { name: "description", content: "The Typography component from Copy UI." },
  ];
}

export default function TypographyPage() {
  return (
    <ComponentTemplate component="Typography">
      <Section
        title="Typography"
        demoAndCode={[<Demo />, demoSourceCode]}
        sourceCode={sourceCode}
        changelog={changelog}
      />
    </ComponentTemplate>
  );
}
