import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";

export default function Demo() {
  return (
    <Flex gap="1rem">
      <Button variant="filled" color="red">
        Delete item
      </Button>
      <Button variant="light" color="green">
        Save changes
      </Button>
      <Button variant="filled" color="yellow">
        Cancel
      </Button>
    </Flex>
  );
}
