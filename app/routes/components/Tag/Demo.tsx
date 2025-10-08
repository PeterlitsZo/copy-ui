import { Tag } from "src/components/Tag";
import { Flex } from "@/components/Flex";

export function Demo() {
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
        <Tag color="red">Frontend</Tag>
        <Tag color="green">Backend</Tag>
        <Tag color="yellow">Full Stack</Tag>
      </Flex>

      <Flex gap="0.5rem" alignItems="center">
        <Tag height="1rem">New</Tag>
        <Tag height="1.25rem">Popular</Tag>
        <Tag height="1.5rem">Featured</Tag>
        <Tag height="1.75rem">Recommended</Tag>
      </Flex>
    </Flex>
  );
}
