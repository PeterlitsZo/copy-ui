import { Trash } from "lucide-react";

import { Flex } from "@/components/Flex";
import { IconButton } from "@/components/IconButton";

export default function Demo() {
  return (
    <Flex gap="1rem" alignItems="center">
      <IconButton size="sm">
        <Trash size={"60%"} />
      </IconButton>
      <IconButton>
        <Trash size={"60%"} />
      </IconButton>
      <IconButton size="lg" variant="filled">
        <Trash size={"60%"} />
      </IconButton>
    </Flex>
  );
}
