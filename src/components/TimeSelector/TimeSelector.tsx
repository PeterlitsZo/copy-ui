import { Clock } from "lucide-react";

import { Button } from "../Button";

export function TimeSelector() {
  return (
    <>
      <Button leftSection={<Clock size='1.25rem' />}>
        <span>TODO...</span>
      </Button>
    </>
  );
}