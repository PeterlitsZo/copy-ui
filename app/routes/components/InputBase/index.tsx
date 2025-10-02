import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
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
