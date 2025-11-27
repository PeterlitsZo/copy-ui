import { useCallback, useEffect, useState } from "react";
import {
  type ResolvedTimeRangeResult,
  safeResolveTimeRange,
  type TimeRange,
  TimeSelector,
} from "src/components/TimeSelector";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Flex } from "@/components/Flex";

export default function Demo() {
  const [timeRange, setTimeRange] = useState<TimeRange | undefined>(undefined);

  const [resolvedTimeRange, setResolvedTimeRange] =
    useState<ResolvedTimeRangeResult | null>(null);

  const resolveTimeRange = useCallback(() => {
    if (timeRange == null) {
      setResolvedTimeRange(null);
      return;
    }
    setResolvedTimeRange(safeResolveTimeRange(timeRange));
  }, [timeRange]);

  useEffect(() => {
    resolveTimeRange();
  }, [resolveTimeRange]);

  return (
    <Flex dir="column" gap="2rem" items="center">
      <TimeSelector value={timeRange} onChange={setTimeRange} />
      <Card>
        <Card.Content>
          {resolvedTimeRange == null && <div>Not selected</div>}
          {resolvedTimeRange?.ok && (
            <Flex dir="column" gap="0.5rem" items="start">
              <div>From: {resolvedTimeRange.value.from.toISOString()}</div>
              <div>To: {resolvedTimeRange.value.to.toISOString()}</div>
              <Button variant="filled" size="sm" onClick={resolveTimeRange}>
                Refresh
              </Button>
            </Flex>
          )}
          {resolvedTimeRange?.ok === false && (
            <div>Error: {resolvedTimeRange.error}</div>
          )}
        </Card.Content>
      </Card>
    </Flex>
  );
}
