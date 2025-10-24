import { Card } from "@/components/Card";
import { Markdown } from "@/components/Markdown";

const content = `\
# Hello World

This is a simple Markdown component demo.

- Item 1
- Item 2
- Item 3

\`\`\`tsx
"use Copy UI";
\`\`\`
`;

export default function Demo() {
  return (
    <Card>
      <Card.Content>
        <Markdown>{content}</Markdown>
      </Card.Content>
    </Card>
  );
}
