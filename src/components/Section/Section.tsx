import classNames from "classnames";
import { useState } from "react";

import styles from "./Section.module.scss";
import { CodeHighlight } from "../CodeHighlight";

interface SectionProps {
  title: string;
  demoAndCode?: [React.ReactNode, string];
  sourceCode: Record<string, string>;
  changelog: string;
}

export function Section({ title, demoAndCode, sourceCode: files, changelog }: SectionProps) {
  const [demo, code] = demoAndCode || [];

  const [currentFilename, setCurrentFilename] = useState(Object.keys(files)[0] || '');
  const currentFileType = {
    ts: 'typescript',
    tsx: 'typescript',
    md: 'markdown',
    scss: 'scss',
  }[currentFilename.split('.').pop() ?? ''] || 'none';
  const fileContentToShow = Object.entries(files).find(([filename]) => filename === currentFilename)?.[1] || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
      <h1 style={{ fontSize: '2.5rem' }}>{title}</h1>
      {demoAndCode && (
        <div style={{ borderRadius: '0.75rem', border: '1px solid oklch(92.8% 0.006 264.531)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', borderBottom: '1px solid oklch(92.8% 0.006 264.531)', minHeight: '30vh' }}>
            {demo}
          </div>
          {code && <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', padding: '0.75rem', fontSize: '0.75rem' }}>
            <CodeHighlight code={code} lang="typescript" />
          </div>}
        </div>
      )}
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Source Code</h2>
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
            <div className={styles.codeBlock}>
              <CodeHighlight code={fileContentToShow} lang={currentFileType} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Change Log</h2>
        <div style={{ backgroundColor: 'oklch(98.5% 0.002 247.839)', border: '1px solid oklch(92.8% 0.006 264.531)', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.75rem' }}>
          <CodeHighlight code={changelog} lang="markdown" />
        </div>
      </div>
    </div>
  )
}