import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";

export function meta() {
  return [
    { title: "Get Started | Copy UI" },
    { name: "description", content: "Get started with Copy UI." },
  ];
}

export default function GetStartedPage() {
  return (
    <ComponentTemplate idx="/v0/docs/get-started">
      <Section.Root title="Get Started">
        <Typography.P>
          Copy UI is a simple and stupid collection of code - help you build
          your UI faster.
        </Typography.P>
        <Typography.P>
          For example, to build your Avatar component, you can just check the
          Copy UI's Avatar component document, copy its code and paste it into
          your own project. That's it.
        </Typography.P>
        <Typography.P>
          Code in Copy UI is stupid enough, so I think it is easy to read and
          change by yourself. I try to build it without any headless UI library,
          because - I know those libraries are good - headless UI libraries are
          hard to change for me (yes, I can fork it and modify it, but it is
          really hard to understand it).
        </Typography.P>
        <Typography.P>
          I like shadcn/ui, but it is build on top of Radix UI (or Base UI,
          React Aria). If you want to change its layout / logic, it is really
          hard sometime.
        </Typography.P>
        <Typography.P>
          Copy UI is inspired by shadcn/ui, but you can not only copy styles,
          but also logic. Another thing you need to know is, Copy UI does not
          use Tailwind CSS. Yes Tailwind CSS is good, but I like to write CSS
          Module more. I need to say that this project is heavily inspired by:
        </Typography.P>
        <Typography.Ul>
          <Typography.Li>shadcn/ui</Typography.Li>
          <Typography.Li>Mantine</Typography.Li>
          <Typography.Li>Radix UI</Typography.Li>
          <Typography.Li>Base UI</Typography.Li>
          <Typography.Li>Hero UI</Typography.Li>
          <Typography.Li>Naive UI</Typography.Li>
          <Typography.Li>MUI</Typography.Li>
        </Typography.Ul>
        <Typography.P>
          Maybe you can find some component looks like one of those projects -
          just because it looks really good. Those projects are under MIT
          License - so this project does the same thing.
        </Typography.P>
      </Section.Root>
    </ComponentTemplate>
  );
}
