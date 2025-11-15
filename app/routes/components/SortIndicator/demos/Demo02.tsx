import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { SortIndicator, useDirection } from "@/components/SortIndicator";

export default function Demo() {
  const [direction, setDirection] = useDirection("asc");

  return (
    <Flex dir="column" gap="1rem">
      <Button
        rightSection={<SortIndicator variant="default" direction={direction} />}
        onClick={() => setDirection()}
      >
        <span>Volume</span>
      </Button>
      <Button
        rightSection={<SortIndicator variant="compact" direction={direction} />}
        onClick={() => setDirection()}
      >
        <span>Volume</span>
      </Button>
    </Flex>
  );
}
