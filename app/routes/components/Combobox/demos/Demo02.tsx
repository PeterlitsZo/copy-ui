import { useState } from "react";

import { Combobox } from "@/components/Combobox";

const allOptions = Array.from({ length: 100 }, (_, i) => ({
  value: `option${i + 1}`,
  label: `Option ${i + 1}`,
}));

export default function Demo() {
  const [value, setValue] = useState<string | null>(null);

  const optionsLoader = async (
    query: string,
  ): Promise<Array<{ value: string; label: string }>> => {
    // Simulate API delay.
    await new Promise((resolve) => setTimeout(resolve, 200));

    const lowerQuery = query.toLowerCase();
    return allOptions.filter((option) =>
      option.label.toLowerCase().includes(lowerQuery),
    );
  };

  return (
    <Combobox value={value} optionsLoader={optionsLoader} onChange={setValue} />
  );
}
