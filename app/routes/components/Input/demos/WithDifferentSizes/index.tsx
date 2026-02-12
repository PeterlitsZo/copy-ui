import { Flex } from "@/components/Flex";
import { Input } from "@/components/Input";

export default function Demo() {
  return (
    <Flex dir="column" gap="1rem">
      <Input size="xs" w="20rem" placeholder="Type something..." />
      <Input size="sm" w="20rem" placeholder="Type something..." />
      <Input size="md" w="20rem" placeholder="Type something..." />
      <Input size="lg" w="20rem" placeholder="Type something..." />
      <Input size="xl" w="20rem" placeholder="Type something..." />
    </Flex>
  );
}
