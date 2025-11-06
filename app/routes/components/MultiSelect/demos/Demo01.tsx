import { useState } from "react";

import { MultiSelect } from "@/components/MultiSelect";
import { useToast } from "@/components/Toast";

export default function Demo() {
  const { addToast } = useToast();

  const [value, setValue] = useState<string | null>(null);
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ];

  return (
    <MultiSelect
      value={value}
      options={options}
      onChange={(value) => {
        setValue(value);
        addToast(`Selected: ${value}`);
      }}
    />
  );
}
