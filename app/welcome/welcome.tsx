import { useState } from "react";
import { SortIndicator, type SortIndicatorDirection } from "src/components/SortIndicator";

export function Welcome() {
  const [direction, setDirection] = useState<SortIndicatorDirection>('asc');

  return (
    <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>SortIndicator</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', border: '1px solid oklch(92.8% 0.006 264.531)', borderRadius: '0.75rem' }}>
          <SortIndicator direction={direction} onDirectionChange={setDirection} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem' }}>index.ts</h2>
          <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem', maxHeight: '50vh', overflow: 'auto' }}>
            <pre style={{ fontSize: '0.875rem' }}>
              <code>{sortIndicatorFiles['index.ts']}</code>
            </pre>
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem' }}>SortIndicator.tsx</h2>
          <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem', maxHeight: '50vh', overflow: 'auto' }}>
            <pre style={{ fontSize: '0.875rem' }}>
              <code>{sortIndicatorFiles['SortIndicator.tsx']}</code>
            </pre>
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem' }}>Usage</h2>
          <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem' }}>
            <pre style={{ fontSize: '0.875rem' }}>
              <code>{sortIndicatorUsage}</code>
            </pre>
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem' }}>Change Log</h2>
          <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem' }}>
            <pre style={{ fontSize: '0.875rem' }}>
              <code>{sortIndicatorChangelog}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

const sortIndicatorFiles: Record<string, string> = {};

sortIndicatorFiles['index.ts'] = `\
// SortIndicator from copy-ui @ 2025-09-04

export { SortIndicator } from './SortIndicator';
export type {
  SortIndicatorDirection,
  SortIndicatorProps
} from './SortIndicator';
`;

sortIndicatorFiles['SortIndicator.tsx'] = `\
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
