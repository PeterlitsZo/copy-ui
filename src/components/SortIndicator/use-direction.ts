import { type SetStateAction, useState } from "react";
import type { SortIndicatorDirection } from "./sort-indicator";

function useDirection(defaultDirection: SortIndicatorDirection = "none") {
  const [direction, setDirectionInternal] = useState(defaultDirection);

  const setDirection = (nxtDir?: SetStateAction<SortIndicatorDirection>) => {
    const defaultNextDirection = (
      {
        asc: "desc",
        desc: "none",
        none: "asc",
      } as const
    )[direction];

    setDirectionInternal(nxtDir ?? defaultNextDirection);
  };

  return [direction, setDirection] as const;
}

function useDirections(
  defaultDirections: Record<string, SortIndicatorDirection>,
) {
  const [directions, setDirectionsInternal] = useState(defaultDirections);

  const setDirection = (
    name: string,
    nxtDir?: SetStateAction<SortIndicatorDirection>,
  ) => {
    setDirectionsInternal((prevDirections) => {
      const originalDirection = prevDirections[name] ?? "none";
      const defaultNextDirection = (
        {
          asc: "desc",
          desc: "none",
          none: "asc",
        } as const
      )[originalDirection];

      if (typeof nxtDir === "function") {
        const result = {} as Record<string, SortIndicatorDirection>;
        for (const [key] of Object.entries(prevDirections)) {
          result[key] = "none";
        }
        result[name] = nxtDir(originalDirection);
        return result;
      }
      const result = {} as Record<string, SortIndicatorDirection>;
      for (const [key] of Object.entries(prevDirections)) {
        result[key] = "none";
      }
      result[name] = nxtDir ?? defaultNextDirection;
      return result;
    });
  };

  return [directions, setDirection] as const;
}

export { useDirection, useDirections };
