import { FileInput } from "@/components/FileInput";
import { Flex } from "@/components/Flex";

export default function Demo() {
  return (
    <Flex dir="column" gap="1rem">
      <FileInput size="xs" w="16rem" placeholder="Choose file..." />
      <FileInput size="sm" w="16rem" placeholder="Choose file..." />
      <FileInput size="md" w="16rem" placeholder="Choose file..." />
      <FileInput size="lg" w="16rem" placeholder="Choose file..." />
      <FileInput size="xl" w="16rem" placeholder="Choose file..." />
    </Flex>
  );
}
