import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

export type SortIndicatorDirection = 'asc' | 'desc' | 'none';

export interface SortIndicatorProps {
  direction: SortIndicatorDirection;
  onDirectionChange?: (direction: SortIndicatorDirection) => void;
}

export function SortIndicator(props: SortIndicatorProps) {
  const Icon = {
    asc: ArrowUpWideNarrow,
    desc: ArrowDownWideNarrow,
    none: ArrowDownUp
  }[props.direction];

  const handleClick = () => {
    const nextDirection = ({
      asc: 'desc',
      desc: 'none',
      none: 'asc'
    } as const)[props.direction];
    props.onDirectionChange?.(nextDirection);
  };

  return (
    <button>
      <Icon onClick={handleClick} style={{ cursor: 'pointer' }} />
    </button>
  );
}