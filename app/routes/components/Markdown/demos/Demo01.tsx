import { Markdown } from "@/components/Markdown";

const content = `\
# Hello World

This is a simple Markdown component demo.

- Item 1
- Item 2
- Item 3
`;

export default function Demo() {
  return <Markdown>{content}</Markdown>;
}
