import { useState } from "react";

import { TimeSelector, type TimeRange } from "src/components/TimeSelector";

export function Demo() {
  const [timeRange, setTimeRange] = useState<TimeRange | undefined>(undefined);

  return <TimeSelector value={timeRange} onChange={setTimeRange} />;
}
