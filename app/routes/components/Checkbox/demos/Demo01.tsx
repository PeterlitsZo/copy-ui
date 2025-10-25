import { useId } from "react";

import { Checkbox } from "@/components/Checkbox";
import { Flex } from "@/components/Flex";

export default function Demo01() {
  const checkboxId = useId();

  return (
    <Flex alignItems="center" gap="0.5rem">
      <Checkbox id={checkboxId} />
      <label htmlFor={checkboxId}>Hello World</label>
    </Flex>
  );
}
