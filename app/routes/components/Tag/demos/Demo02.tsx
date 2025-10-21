import { Tag } from "src/components/Tag";
import { Flex } from "@/components/Flex";

export default function Demo() {
  return (
    <Flex dir="column" gap="1rem">
      <Flex gap="0.5rem">
        <Tag>React</Tag>
        <Tag>TypeScript</Tag>
        <Tag>JavaScript</Tag>
        <Tag>CSS</Tag>
        <Tag>HTML</Tag>
      </Flex>

      <Flex gap="0.5rem">
        <Tag color="red" withDot>
          Frontend
        </Tag>
        <Tag color="green" withDot>
          Backend
        </Tag>
        <Tag color="yellow" withDot>
          Full Stack
        </Tag>
      </Flex>

      <Flex gap="0.5rem" alignItems="center">
        <Tag size="xs">New</Tag>
        <Tag size="sm">Popular</Tag>
        <Tag size="md">Featured</Tag>
        <Tag size="lg">Recommended</Tag>
        <Tag size="xl">Trending</Tag>
      </Flex>
    </Flex>
  );
}
