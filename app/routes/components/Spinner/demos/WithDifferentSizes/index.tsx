import { Flex } from "@/components/Flex";
import { Spinner } from "@/components/Spinner";

export default function Demo() {
  return (
    <Flex dir="row" gap="2rem" alignItems="center">
      <Spinner size="0.75rem" />
      <Spinner size="1rem" />
      <Spinner size="1.25rem" />
      <Spinner size="1.5rem" />
      <Spinner size="1.75rem" />
      <Spinner size="2rem" />
    </Flex>
  );
}
