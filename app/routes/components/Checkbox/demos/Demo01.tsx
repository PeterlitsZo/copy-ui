import { useId } from "react";

import { Checkbox } from "@/components/Checkbox";
import { useJss, useMode, useTheme } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";

export default function Demo01() {
  const checkboxId = useId();

  const mode = useMode();
  const jss = useJss();
  const theme = useTheme();
  const stx = jss.hash({
    color:
      mode === "light" ? theme.colors.gray["900"] : theme.colors.gray["100"],
  });

  return (
    <Flex alignItems="center" gap="0.5rem">
      <Checkbox id={checkboxId} />
      <label htmlFor={checkboxId} className={stx}>
        Hello World
      </label>
    </Flex>
  );
}
