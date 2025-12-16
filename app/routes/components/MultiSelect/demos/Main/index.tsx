import { useState } from "react";

import { MultiSelect } from "@/components/MultiSelect";
import { useToast } from "@/components/Toast";

export default function Demo() {
  const { addToast } = useToast();

  const [value, setValue] = useState<string[] | null>(null);
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "elderberry", label: "Elderberry" },
    { value: "fig", label: "Fig" },
    { value: "grape", label: "Grape" },
    { value: "honeydew", label: "Honeydew" },
    { value: "kiwi", label: "Kiwi" },
    { value: "lemon", label: "Lemon" },
    { value: "mango", label: "Mango" },
    { value: "nectarine", label: "Nectarine" },
    { value: "orange", label: "Orange" },
    { value: "pear", label: "Pear" },
    { value: "pineapple", label: "Pineapple" },
    { value: "quince", label: "Quince" },
    { value: "raspberry", label: "Raspberry" },
    { value: "strawberry", label: "Strawberry" },
    { value: "tangerine", label: "Tangerine" },
    { value: "watermelon", label: "Watermelon" },
  ];

  return (
    <MultiSelect
      w="24rem"
      value={value}
      options={options}
      onChange={(value) => {
        setValue(value);
        addToast({
          message: "Selected!",
          description: `You selected: ${value?.join(", ")}`,
          type: "success",
        });
      }}
    />
  );
}
