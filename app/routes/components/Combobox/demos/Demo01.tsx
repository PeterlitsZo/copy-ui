import { useState } from "react";

import { Combobox } from "@/components/Combobox";
import { useToast } from "@/components/Toast";

const allOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
  { value: "honeydew", label: "Honeydew" },
];

export default function Demo() {
  const { addToast } = useToast();

  const [value, setValue] = useState<string | null>(null);

  const optionsLoader = async (
    query: string,
  ): Promise<Array<{ value: string; label: string }>> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!query.trim()) {
      return allOptions;
    }

    const lowerQuery = query.toLowerCase();
    return allOptions.filter((option) =>
      option.label.toLowerCase().includes(lowerQuery),
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Combobox
        value={value}
        optionsLoader={optionsLoader}
        onChange={(value) => {
          setValue(value);
          addToast(`Selected: ${value}`);
        }}
      />
      <Combobox
        value={value}
        optionsLoader={optionsLoader}
        onChange={(value) => {
          addToast(`Selected: ${value}`);
        }}
        disabled
      />
    </div>
  );
}
