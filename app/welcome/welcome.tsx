import { SortIndicator, useSortIndicatorState } from "src/components/SortIndicator";
import { Button } from "src/components/Button";

import sortIndicatorFilesJson from "app/data/SortIndicator.json";
import buttonFilesJson from "app/data/Button.json";

import styles from "./welcome.module.scss";

export function Welcome() {
  const { direction, handleClick } = useSortIndicatorState('asc');

  return (
    <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Section
        title="SortIndicator"
        demo={(
          <button className={styles.sortIndicatorButton} onClick={handleClick}>
            <span>Volume</span>
            <SortIndicator direction={direction} />
          </button>
        )}
        files={sortIndicatorFilesJson}
        code={sortIndicatorCode}
        changelog={sortIndicatorChangelog}
      />
      <Section
        title="Button"
        demo={<Button>Click Me</Button>}
        files={buttonFilesJson}
        code={buttonCode}
        changelog={buttonChangelog}
      />
      <Section
        title="TimeSelector"
        demo={<>TODO</>}
        files={{}}
        code={'TODO'}
        changelog={'TODO'}
      />
    </div>
  )
}

const sortIndicatorCode = `\
const { direction, handleClick } = useSortIndicatorState('asc');

return (
  <button className={styles.sortIndicatorButton} onClick={handleClick}>
    <span>Volume</span>
    <SortIndicator direction={direction} />
  </button>
)
`;

const sortIndicatorChangelog = `\
- 2025-09-04: Initial version.
`;

const buttonCode = `\
<Button>Click Me</Button>
`;

const buttonChangelog = `\
- 2025-09-04: Initial version.
`;

interface SectionProps {
  title: string;
  demo: React.ReactNode;
  files: Record<string, string>;
  code: string;
  changelog: string;
}

function Section({ title, demo, files, code, changelog }: SectionProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
      <h1 style={{ fontSize: '2.5rem' }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', border: '1px solid oklch(92.8% 0.006 264.531)', borderRadius: '0.75rem' }}>
        {demo}
      </div>
      <div>
        <h2 style={{ fontSize: '1.25rem' }}>Code</h2>
        <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem' }}>
          <pre style={{ fontSize: '0.875rem' }}>
            <code>{code}</code>
          </pre>
        </div>
      </div>
      {Object.entries(files).map(([filename, content]) => (
        <div>
          <h2 style={{ fontSize: '1.25rem' }}>{filename}</h2>
          <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem', maxHeight: '50vh', overflow: 'auto' }}>
            <pre style={{ fontSize: '0.875rem' }}>
              <code>{content}</code>
            </pre>
          </div>
        </div>
      ))}
      <div>
        <h2 style={{ fontSize: '1.25rem' }}>Change Log</h2>
        <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', borderRadius: '0.75rem' }}>
          <pre style={{ fontSize: '0.875rem' }}>
            <code>{changelog}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}