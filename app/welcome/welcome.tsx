import { useContext, useState } from "react";
import classNames from "classnames";

import { SortIndicator, useSortIndicatorState } from "src/components/SortIndicator";
import { Button } from "src/components/Button";
import { ThemeContext, ThemeProvider } from "src/components/ThemeProvider";

import themeProviderFilesJson from "app/data/ThemeProvider.json";
import sortIndicatorFilesJson from "app/data/SortIndicator.json";
import buttonFilesJson from "app/data/Button.json";
import timeSelectorFilesJson from "app/data/TimeSelector.json";

import styles from "./welcome.module.scss";
import { TimeSelector } from "src/components/TimeSelector";

export function Welcome() {

  return (
    <ThemeProvider>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Section
          title="ThemeProvider"
          files={themeProviderFilesJson}
          changelog={'- 2025-09-05: Initial version.'}
        />
        <SortIndicatorSection />
        <Section
          title="Button"
          demoAndCode={[<Button>Click Me</Button>, buttonCode]}
          files={buttonFilesJson}
          changelog={buttonChangelog}
        />
        <Section
          title="TimeSelector"
          demoAndCode={[(
            <TimeSelector />
          ), '<TimeSelector />']}
          files={timeSelectorFilesJson}
          changelog={'TODO'}
        />
      </div>
    </ThemeProvider>
  )
}

const buttonCode = `\
<Button>Click Me</Button>
`;

const buttonChangelog = `\
- 2025-09-04: Initial version.
- 2025-09-05: Use ThemeProvider for theming.
`;

const sortIndicatorCode = `\
const theme = useContext(ThemeContext);
const { direction, handleClick } = useSortIndicatorState('asc');

return (
  <button className={styles.sortIndicatorButton} onClick={handleClick}>
    <span>Volume</span>
    <SortIndicator
      style={{ color: theme.colors.gray['100'] }}
      size="1rem"
      direction={direction}
    />
  </button>
)
`;

const sortIndicatorChangelog = `\
- 2025-09-04: Initial version.
- 2025-09-05: Add the \`size\` prop.
`;

function SortIndicatorSection() {
  const theme = useContext(ThemeContext);
  const { direction, handleClick } = useSortIndicatorState('asc');

  const demo = (
    <button className={styles.sortIndicatorButton} onClick={handleClick}>
      <span>Volume</span>
      <SortIndicator
        style={{ color: theme.colors.gray['600'] }}
        size="1rem"
        direction={direction}
      />
    </button>
  )

  return (
    <Section
      title="SortIndicator"
      demoAndCode={[demo, sortIndicatorCode]}
      files={sortIndicatorFilesJson}
      changelog={sortIndicatorChangelog}
    />
  )
}

interface SectionProps {
  title: string;
  demoAndCode?: [React.ReactNode, string];
  files: Record<string, string>;
  changelog: string;
}

function Section({ title, demoAndCode, files, changelog }: SectionProps) {
  const [demo, code] = demoAndCode || [];

  const [currentFilename, setCurrentFilename] = useState(Object.keys(files)[0] || '');
  const fileContentToShow = Object.entries(files).find(([filename]) => filename === currentFilename)?.[1] || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
      <h1 style={{ fontSize: '2.5rem' }}>{title}</h1>
      {demoAndCode && (
        <div style={{ borderRadius: '0.75rem', border: '1px solid oklch(92.8% 0.006 264.531)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', borderBottom: '1px solid oklch(92.8% 0.006 264.531)', minHeight: '30vh' }}>
            {demo}
          </div>
          <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem' }}>
            <pre style={{ fontSize: '0.875rem' }}>
              <code>{code}</code>
            </pre>
          </div>
        </div>
      )}
      <div>
        <h2 style={{ fontSize: '1.25rem' }}>Source Code</h2>
        <div style={{ display: 'flex', borderRadius: '0.75rem', border: '1px solid oklch(92.8% 0.006 264.531)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem', width: '15rem', borderRight: '1px solid oklch(92.8% 0.006 264.531)' }}>
            {Object.keys(files).map((filename) => (
              <button
                key={filename}
                className={classNames(styles.sourceCodeTreeFilename, filename === currentFilename && styles.active)}
                onClick={() => setCurrentFilename(filename)}
              >
                {filename}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', height: '50vh', overflow: 'auto' }}>
              <pre style={{ fontSize: '0.875rem' }}>
                <code>{fileContentToShow}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 style={{ fontSize: '1.25rem' }}>Change Log</h2>
        <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', border: '1px solid oklch(92.8% 0.006 264.531)', padding: '0.75rem', borderRadius: '0.75rem' }}>
          <pre style={{ fontSize: '0.875rem' }}>
            <code>{changelog}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}