import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";

export default function Demo() {
  return (
    <Flex dir="column" gap="1rem">
      <Flex gap="1rem" alignItems="center">
        <Button variant="default">Default</Button>
        <Button variant="filled">Filled</Button>
        <Button variant="light">Light</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </Flex>
      <Flex gap="1rem" alignItems="center">
        <Button variant="default" disabled>
          Default
        </Button>
        <Button variant="filled" disabled>
          Filled
        </Button>
        <Button variant="light" disabled>
          Light
        </Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="ghost" disabled>
          Ghost
        </Button>
        <Button variant="link" disabled>
          Link
        </Button>
      </Flex>
    </Flex>
  );
}
