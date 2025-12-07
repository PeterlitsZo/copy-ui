import { DocLayout } from "@/layouts/DocLayout";

import Doc from "./doc.mdx";

export function meta() {
  return [
    { title: "resolve-style | Copy UI" },
    {
      name: "description",
      content: "resolve-style in Copy UI.",
    },
  ];
}

export default function ResolveStylePage() {
  return (
    <DocLayout>
      <DocLayout.TitleWithoutTabs
        title="resolve-style"
        desc="Calculate styles at runtime."
      />
      <DocLayout.Content>
        <Doc />
      </DocLayout.Content>
    </DocLayout>
  );
}
