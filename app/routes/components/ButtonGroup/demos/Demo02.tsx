import { Button } from "src/components/Button";
import { ButtonGroup } from "src/components/ButtonGroup";
import { Flex } from "@/components/Flex";

export default function Demo() {
  return (
    <Flex dir="column" gap="1rem">
      <ButtonGroup>
        <Button variant="filled">One</Button>
        <Button variant="filled">Two</Button>
        <Button variant="filled">Three</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="light">One</Button>
        <Button variant="light">Two</Button>
        <Button variant="light">Three</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">One</Button>
        <Button variant="secondary">Two</Button>
        <Button variant="secondary">Three</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="ghost">One</Button>
        <Button variant="ghost">Two</Button>
        <Button variant="ghost">Three</Button>
      </ButtonGroup>
    </Flex>
  );
}
