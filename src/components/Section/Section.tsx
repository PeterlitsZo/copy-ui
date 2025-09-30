import classNames from "classnames";
import { useState, type CSSProperties, type FC } from "react";

import { CodeHighlight } from "../CodeHighlight";
import { useTheme } from "../ThemeProvider";

import styles from "./Section.module.scss";
import { IconButton } from "../IconButton";
import { ClipboardCopy } from "lucide-react";
import { useToast } from "../Toast";

interface SectionProps {
  title: string;
  demoAndCode?: [React.ReactNode, string];
  sourceCode: Record<string, string>;
  changelog: string;
}

export function Section({ title, demoAndCode, sourceCode: files, changelog }: SectionProps) {
  const theme = useTheme();

  const [demo, demoCode] = demoAndCode || [];

  const [currentFilename, setCurrentFilename] = useState(Object.keys(files)[0] || '');
  const currentFileType = {
    ts: 'typescript',
    tsx: 'tsx',
    md: 'markdown',
    scss: 'scss',
  }[currentFilename.split('.').pop() ?? ''] || 'none';
  const fileContentToShow = Object.entries(files).find(([filename]) => filename === currentFilename)?.[1] || '';

  const computedStyle = {
    '--border-color': theme.colors.gray['200'],
    '--background-color': theme.colors.gray['000'],
  } as CSSProperties;

  return (
    <div className={styles.section} style={computedStyle}>
      <h1 style={{ fontSize: '2.5rem' }}>{title}</h1>
      {demoAndCode && (
        <div className={styles.demoAndCode} >
          <div className={styles.demo}>
            <div style={{ position: 'relative' }}>
              {demo}
            </div>
          </div>
          {demoCode && <div className={styles.demoCode}>
            <CodeHighlight code={demoCode} lang="tsx" />
          </div>}
        </div>
      )}
      <div>
        <h2 className={styles.subtitle}>Source Code</h2>
        <div className={styles.sourceCode}>
          <div className={styles.sourceCodeTree}>
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
            <CodeBlock content={fileContentToShow} type={currentFileType} />
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.subtitle}>Change Log</h2>
        <div className={styles.changeLogContent}>
          <CodeHighlight code={changelog} lang="markdown" />
        </div>
      </div>
    </div>
  )
}

interface CodeBlockProps {
  content: string;
  type: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ content, type }) => {
  const theme = useTheme();
  const { addToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    addToast('Copied to clipboard!');
  }

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeBlockContent}>
        <CodeHighlight code={content} lang={type} />
      </div>
      <IconButton className={styles.copyButton} onClick={handleCopy}>
        <ClipboardCopy size={'60%'} color={theme.colors.gray['700']} />
      </IconButton>
    </div>
  )
}
