import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";

import { changelog } from "./changelog.codegen";
import { Demo } from "./Demo";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta() {
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
