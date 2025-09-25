import type { Route } from "./+types/index";

import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";

import { sourceCode } from "./source_code.codegen";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { changelog } from "./changelog.codegen";

import { Demo } from "./Demo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Avatar | Copy UI" },
    { name: "description", content: "The Avatar component from Copy UI." },
  ];
}

export default function AvatarPage() {
  return (
    <ComponentTemplate component="Avatar">
      <Section
        title="Avatar"
        demoAndCode={[<Demo />, demoSourceCode]}
        sourceCode={sourceCode}
        changelog={changelog}
      />
    </ComponentTemplate>
  );
}