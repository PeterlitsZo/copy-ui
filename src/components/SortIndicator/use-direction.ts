import { useState } from "react";
import type { SortIndicatorDirection } from "./sort-indicator";

export function useDirection(
  defaultDirection: SortIndicatorDirection = "none",
) {
  const [direction, setDirectionInternal] = useState(defaultDirection);

  const setDirection = (nxtDir?: SortIndicatorDirection) => {
    const nextDirection = (
      {
        asc: "desc",
        desc: "none",
        none: "asc",
      } as const
    )[direction];
    setDirectionInternal(nxtDir ?? nextDirection);
  };

  return [direction, setDirection] as const;
}
