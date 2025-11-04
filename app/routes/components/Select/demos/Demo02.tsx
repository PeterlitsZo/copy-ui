import { useState } from "react";

import { Select } from "@/components/Select";
import { useToast } from "@/components/Toast";

const createOptions = (count: number) => {
  const options = [];
  for (let i = 1; i <= count; i++) {
    options.push({ value: `option${i}`, label: `Option ${i}` });
  }
  return options;
};

export default function Demo() {
  const { addToast } = useToast();

  const [value, setValue] = useState<string | null>(null);
  const options = createOptions(100);

  return (
    <Select
      value={value}
      options={options}
      onChange={(value) => {
        setValue(value);
        addToast(`Selected: ${value}`);
      }}
    />
  );
}
