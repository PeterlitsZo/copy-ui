import { useState } from "react";

import { Combobox } from "@/components/Combobox";
import { useJss } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";

const allOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

export default function Demo() {
  const jss = useJss();

  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const [value3, setValue3] = useState<string | null>(null);
  const [value4, setValue4] = useState<string | null>(null);

  const optionsLoader = async (
    query: string,
  ): Promise<Array<{ value: string; label: string }>> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!query.trim()) {
      return allOptions;
    }

    const lowerQuery = query.toLowerCase();
    return allOptions.filter((option) =>
      option.label.toLowerCase().includes(lowerQuery),
    );
  };

  const stx = jss.hash({
    width: "30rem",
  });

  return (
    <Flex dir="column" gap="1rem" className={stx}>
      <Combobox
        width="sm"
        value={value1}
        optionsLoader={optionsLoader}
        onChange={setValue1}
      />
      <Combobox
        width="md"
        value={value2}
        optionsLoader={optionsLoader}
        onChange={setValue2}
      />
      <Combobox
        width="lg"
        value={value3}
        optionsLoader={optionsLoader}
        onChange={setValue3}
      />
      <Combobox
        width="full"
        value={value4}
        optionsLoader={optionsLoader}
        onChange={setValue4}
      />
    </Flex>
  );
}
