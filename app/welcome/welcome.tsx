import { useState } from "react";
import { SortIndicator, type SortIndicatorDirection } from "src/components/SortIndicator";
import sortIndicatorFilesJson from "app/data/SortIndicator.json";

export function Welcome() {
  const [direction, setDirection] = useState<SortIndicatorDirection>('asc');

  return (
    <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Section
        title="SortIndicator"
        demo={<SortIndicator direction={direction} onDirectionChange={setDirection} />}
        files={sortIndicatorFilesJson}
        usage={sortIndicatorUsage}
        changelog={sortIndicatorChangelog}
      />
    </div>
  )
}

const sortIndicatorUsage = `\
const [direction, setDirection] = useState<SortIndicatorDirection>('asc');

return (
  <SortIndicator direction={direction} onDirectionChange={setDirection} />
);
`;

const sortIndicatorChangelog = `\
- 2025-09-04: Initial version.
`;

interface SectionProps {
  title: string;
  demo: React.ReactNode;
  files: Record<string, string>;
  usage: string;
  changelog: string;
}

function Section({ title, demo, files, usage, changelog }: SectionProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
      <h1 style={{ fontSize: '2.5rem' }}>SortIndicator</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', border: '1px solid oklch(92.8% 0.006 264.531)', borderRadius: '0.75rem' }}>
        {demo}
      </div>
      <div>
        <h2 style={{ fontSize: '1.25rem' }}>index.ts</h2>
        <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem', maxHeight: '50vh', overflow: 'auto' }}>
          <pre style={{ fontSize: '0.875rem' }}>
            <code>{sortIndicatorFilesJson['index.ts']}</code>
          </pre>
        </div>
      </div>
      <div>
        <h2 style={{ fontSize: '1.25rem' }}>SortIndicator.tsx</h2>
        <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem', maxHeight: '50vh', overflow: 'auto' }}>
          <pre style={{ fontSize: '0.875rem' }}>
            <code>{sortIndicatorFilesJson['SortIndicator.tsx']}</code>
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
  )
}