import type { Route } from "./+types/index";

import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";

import { sourceCode } from "./source_code.codegen";
import { changelog } from "./changelog.codegen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ThemeProvider | Copy UI" },
    { name: "description", content: "The ThemeProvider component from Copy UI." },
  ];
}

export default function ThemeProviderPage() {
  return (
    <ComponentTemplate component="ThemeProvider">
      <Section
        title="ThemeProvider"
        sourceCode={sourceCode}
        changelog={changelog}
      />
    </ComponentTemplate>
  );
}
