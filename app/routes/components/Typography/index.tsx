import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";

import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/demo_01";
import demo01SourceCode from "./demos/demo_01.source_code.codegen";
import Demo02 from "./demos/demo_02";
import demo02SourceCode from "./demos/demo_02.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta() {
  return [
    { title: "Typography | Copy UI" },
    { name: "description", content: "The Typography component from Copy UI." },
  ];
}

export default function TypographyPage() {
  return (
    <Section title="Typography">
      <Typography.H2 mt="1.5rem" mb="1rem">
        Usage
      </Typography.H2>
      <Section.Demo node={<Demo01 />} code={demo01SourceCode} />
      <Section.Demo node={<Demo02 />} code={demo02SourceCode} />
      <Section.SourceCode files={sourceCode} />
      <Section.Changelog changelog={changelog} />
    </Section>
  );
}
