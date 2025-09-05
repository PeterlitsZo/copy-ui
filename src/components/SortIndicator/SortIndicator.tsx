import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
} from "lucide-react";
import { useState, type SVGAttributes } from "react";

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

export type SortIndicatorProps = SVGAttributes<SVGElement> & {
  direction: SortIndicatorDirection;
  size?: string | number;
}

export function SortIndicator(props: SortIndicatorProps) {
  const { direction, size, ...rest } = props;

  const Icon = {
    asc: ArrowUpWideNarrow,
    desc: ArrowDownWideNarrow,
    none: ArrowDownUp
  }[props.direction];

  return (
    <Icon
      size={size}
      {...rest}
    />
  );
}