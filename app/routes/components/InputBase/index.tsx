import type { Route } from "./+types/index";

import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";

import { sourceCode } from "./source_code.codegen";
import { changelog } from "./changelog.codegen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "InputBase | Copy UI" },
    { name: "description", content: "The InputBase component from Copy UI." },
  ];
}

export default function InputBasePage() {
  return (
    <ComponentTemplate component="InputBase">
      <Section
        title="InputBase"
        sourceCode={sourceCode}
        changelog={changelog}
      />
    </ComponentTemplate>
  );
}

