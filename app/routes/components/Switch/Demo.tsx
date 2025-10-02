import { useState } from "react";

import { Flex } from "@/components/Flex";
import { Switch } from "@/components/Switch";

export function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Flex dir="column" alignItems="center" gap="1rem">
      <Flex alignItems="center" gap="0.25rem">
        <span>Yes, you can switch me →</span>
        <Switch size="text" value={checked} onChange={setChecked} />
        <span>Enjoy it.</span>
      </Flex>
      <Flex alignItems="center" gap="1rem">
        <Switch size="xs" value={checked} onChange={setChecked} />
        <Switch size="sm" value={checked} onChange={setChecked} />
        <Switch size="md" value={checked} onChange={setChecked} />
        <Switch size="lg" value={checked} onChange={setChecked} />
        <Switch size="xl" value={checked} onChange={setChecked} />
      </Flex>
    </Flex>
  );
}
