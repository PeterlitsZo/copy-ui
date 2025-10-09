import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import { Demo } from "./Demo";
import { demoSourceCode } from "./Demo_source_code.codegen";
import { sourceCode } from "./source_code.codegen";
import { Typography } from "@/components/Typography";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "CodeBlock | Copy UI" },
    {
      name: "description",
      content: "The CodeBlock component from Copy UI.",
    },
  ];
}

export default function CodeBlockPage() {
  return (
    <ComponentTemplate component="CodeBlock">
      <Section.Root title="CodeBlock">
        <Section.Demo node={<Demo />} code={demoSourceCode} />
        <Typography.H2 mt="1.5rem">Usage</Typography.H2>
        <Typography.P>
          The CodeBlock component is just built on top of the ScrollArea and
          CodeHighlight - very simple. It give you a better component to show
          your code snippets with a max height and a scroll when needed - and
          good background color (gray-000).
        </Typography.P>
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
