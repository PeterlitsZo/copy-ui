import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import { Demo } from "./Demo";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "CodeHighlight | Copy UI" },
    {
      name: "description",
      content: "The CodeHighlight component from Copy UI.",
    },
  ];
}

export default function CodeHighlightPage() {
  return (
    <ComponentTemplate component="CodeHighlight">
      <Section
        title="CodeHighlight"
        demoAndCode={[<Demo />, demoSourceCode]}
        sourceCode={sourceCode}
        changelog={changelog}
      />
    </ComponentTemplate>
  );
}
