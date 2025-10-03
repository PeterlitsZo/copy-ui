import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import { Demo } from "./Demo";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DatePicker | Copy UI" },
    { name: "description", content: "The DatePicker component from Copy UI." },
  ];
}

export default function DatePickerPage() {
  return (
    <ComponentTemplate component="DatePicker">
      <Section
        title="DatePicker"
        demoAndCode={[<Demo />, demoSourceCode]}
        sourceCode={sourceCode}
        changelog={changelog}
      />
    </ComponentTemplate>
  );
}
