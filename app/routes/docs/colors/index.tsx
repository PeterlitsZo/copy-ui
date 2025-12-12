import { DocLayout } from "@/layouts/DocLayout";

import Doc from "./doc.mdx";

export function meta() {
  return [
    { title: "Colors | Copy UI" },
    { name: "description", content: "Color palette used in Copy UI." },
  ];
}

export default function ColorsPage() {
  return (
    <DocLayout>
      <DocLayout.TitleWithoutTabs
        title="Colors"
        desc="Color palette used in Copy UI."
      />
      <DocLayout.Content>
        <Doc />
      </DocLayout.Content>
    </DocLayout>
  );
}
