import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow
} from "lucide-react";
import { useState } from "react";

export type SortIndicatorDirection = 'asc' | 'desc' | 'none';

export function useSortIndicatorState(
  defaultDirection: SortIndicatorDirection = 'none'
) {
  const [direction, setDirection] = useState(defaultDirection);

  const handleClick = () => {
    const nextDirection = ({
      asc: 'desc',
      desc: 'none',
      none: 'asc'
    } as const)[direction];
    setDirection(nextDirection);
  };

  return { direction, handleClick };
}

export interface SortIndicatorProps {
  direction: SortIndicatorDirection;
  size?: string | number;
}

export function SortIndicator(props: SortIndicatorProps) {
  const Icon = {
    asc: ArrowUpWideNarrow,
    desc: ArrowDownWideNarrow,
    none: ArrowDownUp
  }[props.direction];

  return (
    <Icon size={props.size} />
  );
}