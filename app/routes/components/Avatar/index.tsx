import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";

import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
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
      <Section.Root title="Avatar">
        <Section.Demo node={<Demo01 />} code={demo01SourceCode} />
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
