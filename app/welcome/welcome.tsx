import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react"
import { useState } from "react";

export function Welcome() {
  const [direction, setDirection] = useState<SortIndicatorDirection>('asc');

  return (
    <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>SortIndicator</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', border: '1px solid oklch(92.8% 0.006 264.531)', borderRadius: '0.75rem' }}>
          <SortIndicator direction={direction} onDirectionChange={setDirection} />
        </div>
        <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem', maxHeight: '50vh', overflow: 'auto' }}>
          <pre style={{ fontSize: '0.875rem' }}>
            <code>{sortIndicatorCode}</code>
          </pre>
        </div>
        <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem' }}>
          <pre style={{ fontSize: '0.875rem' }}>
            <code>{sortIndicatorUsage}</code>
          </pre>
        </div>
        <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem' }}>
          <pre style={{ fontSize: '0.875rem' }}>
            <code>{sortIndicatorChangelog}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

const sortIndicatorCode = `\
// SortIndicator from copy-ui @ 2025-09-04

export type SortIndicatorDirection = 'asc' | 'desc' | 'none';

export interface SortIndicatorProps {
  direction: SortIndicatorDirection;
  onDirectionChange?: (direction: SortIndicatorDirection) => void;
}

export function SortIndicator(props: SortIndicatorProps) {
  switch (props.direction) {
    case 'asc': {
      return (
        <ArrowUpWideNarrow
          onClick={() => props.onDirectionChange?.('desc')}
        />
      );
    }
    case 'desc': {
      return (
        <ArrowDownWideNarrow
          onClick={() => props.onDirectionChange?.('none')}
        />
      );
    }
    default: {
      return (
        <ArrowDownUp
          onClick={() => props.onDirectionChange?.('asc')}
        />
      );
    }
  }
}
`;

const sortIndicatorUsage = `\
const [direction, setDirection] = useState<SortIndicatorDirection>('asc');

return (
  <SortIndicator direction={direction} onDirectionChange={setDirection} />
);
`;

const sortIndicatorChangelog = `\
- 2025-09-04: Initial version.
`;

export type SortIndicatorDirection = 'asc' | 'desc' | 'none';

export interface SortIndicatorProps {
  direction: SortIndicatorDirection;
  onDirectionChange?: (direction: SortIndicatorDirection) => void;
}

export function SortIndicator(props: SortIndicatorProps) {
  switch (props.direction) {
    case 'asc': {
      return (
        <ArrowUpWideNarrow
          onClick={() => props.onDirectionChange?.('desc')}
        />
      );
    }
    case 'desc': {
      return (
        <ArrowDownWideNarrow
          onClick={() => props.onDirectionChange?.('none')}
        />
      );
    }
    default: {
      return (
        <ArrowDownUp
          onClick={() => props.onDirectionChange?.('asc')}
        />
      );
    }
  }
}
