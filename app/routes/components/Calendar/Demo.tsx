import dayjs from "dayjs";
import { useState } from "react";

import { Calendar } from "@/components/Calendar";
import { Flex } from "@/components/Flex";
import { useToast } from "@/components/Toast";

export function Demo() {
  const { addToast } = useToast();

  const [value, setValue] = useState(dayjs());

  const handleChange = (date: dayjs.Dayjs) => {
    setValue(date);
    addToast(`You selected ${date.format("YYYY-MM-DD")}.`);
  };

  return (
    <Flex dir="row" gap="1rem" alignItems="center">
      <Calendar value={value} onChange={handleChange} />
    </Flex>
  );
}
