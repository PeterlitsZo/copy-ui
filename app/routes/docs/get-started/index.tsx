import { DocLayout } from "@/layouts/DocLayout";

import Doc from "./doc.mdx";

export function meta() {
  return [
    { title: "Get Started | Copy UI" },
    { name: "description", content: "Get started with Copy UI." },
  ];
}

export default function GetStartedPage() {
  return (
    <DocLayout>
      <DocLayout.TitleWithoutTabs
        title="Get Started"
        desc="Get started with Copy UI."
      />
      <DocLayout.Content>
        <Doc />
      </DocLayout.Content>
    </DocLayout>
  );
}
