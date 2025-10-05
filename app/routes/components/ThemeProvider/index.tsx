import { CodeHighlight } from "@/components/CodeHighlight";
import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";
import { useTheme } from "@/components/ThemeProvider";
import { Typography } from "@/components/Typography";
import type { Route } from "./+types/index";
import { changelog } from "./changelog.codegen";
import { sourceCode } from "./source_code.codegen";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "ThemeProvider | Copy UI" },
    {
      name: "description",
      content: "The ThemeProvider component from Copy UI.",
    },
  ];
}

export default function ThemeProviderPage() {
  const theme = useTheme();

  return (
    <ComponentTemplate component="ThemeProvider">
      <Section.Root title="ThemeProvider">
        <Typography.H2>Usage</Typography.H2>
        <Typography.P>
          The ThemeProvider component is used to provide a theme to all Copy UI
          components in your application. It uses React Context to pass down the
          theme values.
        </Typography.P>
        <Typography.P>
          You can use the function useTheme to access the current theme values
          in your components. Like this:
        </Typography.P>
        <div
          style={{
            padding: "1rem",
            backgroundColor: theme.colors.gray["000"],
            borderRadius: "0.5rem",
          }}
        >
          <CodeHighlight lang="tsx" code={usageCode} withLineNumbers />
        </div>
        <Section.SourceCode files={sourceCode} />
        <Section.Changelog changelog={changelog} />
      </Section.Root>
    </ComponentTemplate>
  );
}

const usageCode = `\
import { useTheme } from "@/components/ThemeProvider";

export function MyComponent() {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: theme.colors.gray["000"] }}>
      This div has a background color from the theme!
    </div>
  );
}
`;
