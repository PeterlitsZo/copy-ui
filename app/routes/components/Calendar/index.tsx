import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";

import type { Route } from "./+types/index";

import { changelog } from "./changelog.codegen";
import { Demo } from "./Demo";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Calendar | Copy UI" },
    { name: "description", content: "The Calendar component from Copy UI." },
  ];
}

export default function CalendarPage() {
  return (
    <ComponentTemplate component="Calendar">
      <Section
        title="Calendar"
        demoAndCode={[<Demo />, demoSourceCode]}
        sourceCode={sourceCode}
        changelog={changelog}
      />
    </ComponentTemplate>
  );
}
