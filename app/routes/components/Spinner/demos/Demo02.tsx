import { Flex } from "@/components/Flex";
import { Spinner } from "@/components/Spinner";

export default function Demo() {
  return (
    <Flex dir="row" gap="2rem" alignItems="center">
      <Spinner size="1rem" />
      <Spinner size="1.5rem" />
      <Spinner size="2rem" />
      <Spinner size="2.5rem" />
      <Spinner size="3rem" />
    </Flex>
  );
}
