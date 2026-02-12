import { Flex } from "@/components/Flex";
import { Input } from "@/components/Input";

export default function Demo() {
  return (
    <Flex dir="column" gap="1rem">
      <Input disabled placeholder="Disabled input" />
      <Input disabled variant="filled" placeholder="Disabled filled input" />
    </Flex>
  );
}
