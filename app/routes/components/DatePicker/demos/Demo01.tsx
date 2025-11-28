import type dayjs from "dayjs";
import { useState } from "react";
import { DatePicker } from "@/components/DatePicker";
import { Flex } from "@/components/Flex";

export default function Demo() {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  return (
    <Flex dir="column" gap="1rem" alignItems="center">
      <DatePicker date={date} onDateChange={setDate} />
      <span>{date?.format("YYYY-MM-DD HH:mm:ss")}</span>
    </Flex>
  );
}
