import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";

export default function Demo() {
  return (
    <Flex gap="1rem" alignItems="center">
      <Button size="xs">Oh</Button>
      <Button size="sm" variant="filled">
        I mean
      </Button>
      <Button>Hello</Button>
      <Button size="lg" variant="filled" disabled>
        World
      </Button>
      <Button size="xl" variant="light">
        And you
      </Button>
    </Flex>
  );
}
