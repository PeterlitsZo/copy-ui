import { useState } from "react";

import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout/doc-layout";

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
  const [tabsValue, setTabsValue] = useState("doc");

  const tabs = [
    { name: "doc", label: "Document" },
    { name: "source", label: "Source Code" },
    { name: "changelog", label: "Changelog" },
  ];

  return (
    <DocLayout>
      <DocLayout.Title
        title="ThemeProvider"
        desc="Provide a theme to your application."
        tabsValue={tabsValue}
        tabs={tabs}
        onTabsValueChange={setTabsValue}
      />
      {tabsValue === "doc" && (
        <DocLayout.Content>
          <Typography.P>
            The ThemeProvider component is used to provide a theme to all Copy
            UI components in your application. It uses React Context to pass
            down the theme values.
          </Typography.P>
          <Typography.P>
            You can use the function useTheme to access the current theme values
            in your components. Like this:
          </Typography.P>
          <Typography.CodeBlock lang="tsx" code={usageCode} withLineNumbers />
        </DocLayout.Content>
      )}
      {tabsValue === "source" && (
        <DocLayout.Content>
          <DocLayout.Files files={sourceCode} />
        </DocLayout.Content>
      )}
      {tabsValue === "changelog" && (
        <DocLayout.Content>
          <DocLayout.Changelog changelog={changelog} />
        </DocLayout.Content>
      )}
    </DocLayout>
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
