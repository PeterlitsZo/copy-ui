import { useState } from "react";

import { type TimeRange, TimeSelector } from "src/components/TimeSelector";

export default function Demo() {
  const [timeRange, setTimeRange] = useState<TimeRange | undefined>(undefined);

  return <TimeSelector value={timeRange} onChange={setTimeRange} />;
}
