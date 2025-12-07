import { useState } from "react";

import { Flex } from "@/components/Flex";
import { Switch } from "@/components/Switch";
import { Typography } from "@/components/Typography";

export default function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Flex dir="column" items="center" gap="2rem">
      <Flex items="center" gap="0.25rem">
        <span>
          Use inline Switch with <Typography.Code>size="text"</Typography.Code>{" "}
          →
        </span>
        <Switch size="text" value={checked} onChange={setChecked} />
      </Flex>
      <Flex items="center" gap="1rem">
        <Switch size="xs" value={checked} onChange={setChecked} />
        <Switch size="sm" value={checked} onChange={setChecked} />
        <Switch size="md" value={checked} onChange={setChecked} />
        <Switch size="lg" value={checked} onChange={setChecked} />
        <Switch size="xl" value={checked} onChange={setChecked} />
      </Flex>
    </Flex>
  );
}
