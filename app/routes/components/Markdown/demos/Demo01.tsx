import { CodeBlock } from "@/components/CodeBlock";
import { Flex } from "@/components/Flex";
import { Markdown } from "@/components/Markdown";
import { Paper } from "@/components/Paper";
import content from "./content01.md?raw";

export default function Demo() {
  return (
    <Paper radius="md" withBorder withPadding>
      <Flex dir="row" gap="1rem">
        <Markdown>{content}</Markdown>
        <CodeBlock code={content} lang="markdown" />
      </Flex>
    </Paper>
  );
}
