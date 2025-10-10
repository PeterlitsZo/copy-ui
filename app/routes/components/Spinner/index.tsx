import { ComponentTemplate } from "src/components/ComponentTemplate";
import { Section } from "src/components/Section";
import { Typography } from "@/components/Typography";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Spinner | Copy UI" },
    { name: "description", content: "The Spinner component from Copy UI." },
  ];
}

export default function SpinnerPage() {
  return (
    <ComponentTemplate component="Spinner">
      <Section.Root title="Spinner">
        <Section.Demo node={<Demo01 />} code={demo01SourceCode} />
        <Typography.H2 mt="1.5rem" mb="1rem">
          Note
        </Typography.H2>
        <Typography.P>
          The <Typography.Code>Spinner</Typography.Code> component is copied
          from shadcn/ui - a great UI library which you must know.
        </Typography.P>
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}
