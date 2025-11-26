import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";

export default function Demo() {
  return (
    <Flex gap="1rem" alignItems="center">
      <Button variant="default">Default</Button>
      <Button variant="filled">Filled</Button>
      <Button variant="light">Light</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </Flex>
  );
}
