import { Flex } from "@/components/Flex";
import { Input } from "@/components/Input";

export default function Demo() {
  return (
    <Flex dir="column" gap="1rem">
      <Input size="sm" placeholder="Type something..." />
      <Input size="md" placeholder="Type something..." />
      <Input size="lg" placeholder="Type something..." />
    </Flex>
  );
}
