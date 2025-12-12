import type dayjs from "dayjs";
import { useState } from "react";

import { Card } from "@/components/Card";
import { useJss, useTheme } from "@/components/CopyUiProvider";
import { DatePicker } from "@/components/DatePicker";
import { Flex } from "@/components/Flex";

export default function Demo() {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  const jss = useJss();
  const theme = useTheme();
  const nothingStx = jss.hash({
    color: theme.colors.gray["600"],
    fontStyle: "italic",
  });

  return (
    <Flex dir="column" gap="1rem" alignItems="center">
      <DatePicker w="20rem" date={date} onDateChange={setDate} />
      <Card>
        <Card.Content>
          You selected:{" "}
          {date?.format("YYYY-MM-DD HH:mm:ss") ?? (
            <span className={nothingStx}>(nothing)</span>
          )}
        </Card.Content>
      </Card>
    </Flex>
  );
}
