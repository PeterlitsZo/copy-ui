import { useState } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { Select } from "@/components/Select";

export default function Demo() {
  const jss = useJss();

  const stx = jss.hash({
    width: "30rem",
  });

  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const [value3, setValue3] = useState<string | null>(null);
  const [value4, setValue4] = useState<string | null>(null);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <Flex dir="column" gap="1rem" className={stx}>
      <Select
        width="sm"
        value={value1}
        options={options}
        onChange={setValue1}
      />
      <Select
        width="md"
        value={value2}
        options={options}
        onChange={setValue2}
      />
      <Select
        width="lg"
        value={value3}
        options={options}
        onChange={setValue3}
      />
      <Select
        width="full"
        value={value4}
        options={options}
        onChange={setValue4}
      />
    </Flex>
  );
}
