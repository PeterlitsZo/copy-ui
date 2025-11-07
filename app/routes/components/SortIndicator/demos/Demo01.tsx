import { Button } from "@/components/Button";
import { SortIndicator, useDirection } from "@/components/SortIndicator";

export default function Demo() {
  const [direction, setDirection] = useDirection("asc");

  return (
    <Button
      rightSection={<SortIndicator direction={direction} />}
      onClick={() => setDirection()}
    >
      <span>Volume</span>
    </Button>
  );
}
