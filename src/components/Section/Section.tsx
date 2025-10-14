import classNames from "classnames";
import { ClipboardCopy, Maximize } from "lucide-react";
import { type CSSProperties, type FC, useState } from "react";

import { Markdown } from "@/components//Markdown";
import { Background } from "@/components/Background";
import { ButtonGroup } from "@/components/ButtonGroup";
import { CodeHighlight } from "@/components/CodeHighlight";
import { IconButton } from "@/components/IconButton";
import { Modal } from "@/components/Modal";
import { ScrollArea } from "@/components/ScrollArea";
import type { Theme } from "@/components/ThemeProvider";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/components/Toast";
import { Tooltip } from "@/components/Tooltip";
import { Typography } from "@/components/Typography";

import styles from "./Section.module.scss";

// rootStyle
// =============================================================================

const rootStyle = (theme: Theme) =>
  ({
    "--border-color": theme.colors.gray["200"],
    "--background-color": theme.colors.gray["000"],
  }) as CSSProperties;

// Section.Root
// =============================================================================

interface SectionRootProps {
  children: React.ReactNode;
  title: string;
}

const SectionRoot: FC<SectionRootProps> = (props) => {
  const { children, title } = props;

  const theme = useTheme();

  const computedStyle = rootStyle(theme);

  return (
    <div className={styles.section} style={computedStyle}>
      <div className={styles.sectionHeader}>
        <Typography.Root className={styles.sectionHeaderWrapper}>
          <Typography.H1 mt="3rem">{title}</Typography.H1>
        </Typography.Root>
      </div>
      <div className={styles.sectionBody}>
        <Typography.Root className={styles.sectionBodyWrapper}>
          {children}
        </Typography.Root>
      </div>
    </div>
  );
};

// Section.Demo
// =============================================================================

interface SectionDemoProps {
  node: React.ReactNode;
  code?: string;
}

const SectionDemo: FC<SectionDemoProps> = (props) => {
  const { node, code } = props;

  return (
    <div className={styles.demoAndCode}>
      <div className={styles.demo}>
        <Background kind="dots" />
        <div style={{ position: "relative" }}>{node}</div>
      </div>
      {code && (
        <ScrollArea className={styles.demoCode}>
          <ScrollArea.Viewport className={styles.demoCodeViewport}>
            <ScrollArea.Content className={styles.demoCodeContent}>
              <CodeHighlight code={code} lang="tsx" />
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea>
      )}
    </div>
  );
};

// Section.SourceCode
// =============================================================================

interface SectionSourceCodeProps {
  files: Record<string, string>;
}

const SectionSourceCode: FC<SectionSourceCodeProps> = (props) => {
  const { files } = props;

  const theme = useTheme();

  const [currentFilename, setCurrentFilename] = useState(
    Object.keys(files)[0] || "",
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const currentFileType =
    {
      ts: "typescript",
      tsx: "tsx",
      md: "markdown",
      scss: "scss",
    }[currentFilename.split(".").pop() ?? ""] || "none";
  const fileContentToShow =
    Object.entries(files).find(
      ([filename]) => filename === currentFilename,
    )?.[1] || "";

  const sourceCodeTree = (
    <div className={styles.sourceCodeTree}>
      {Object.keys(files).map((filename) => (
        <button
          key={filename}
          className={classNames(
            styles.sourceCodeTreeFilename,
            filename === currentFilename && styles.active,
          )}
          onClick={() => setCurrentFilename(filename)}
          type="button"
        >
          {filename}
        </button>
      ))}
    </div>
  );

  const sourceCodeBlock = (
    showFullscreenButton: boolean,
    codeBlockHeight: string,
  ) => (
    <div style={{ flex: 1 }}>
      <CodeBlock
        content={fileContentToShow}
        type={currentFileType}
        showFullscreenButton={showFullscreenButton}
        onFullscreen={() => setModalOpen(true)}
        height={codeBlockHeight}
      />
    </div>
  );

  return (
    <div>
      <Typography.H2 mt="1.5rem" style={{ marginBottom: "1rem" }}>
        Source Code
      </Typography.H2>
      <div className={styles.sourceCode}>
        {sourceCodeTree}
        {sourceCodeBlock(true, "62.5vh")}
      </div>
      <Modal isOpen={isModalOpen} style={rootStyle(theme)}>
        <Modal.Overlay onClick={() => setModalOpen(false)} />
        <Modal.Content
          center
          shadow
          className={classNames(
            styles.sourceCodeModalContent,
            styles.sourceCode,
          )}
        >
          {sourceCodeTree}
          {sourceCodeBlock(false, "100%")}
        </Modal.Content>
      </Modal>
    </div>
  );
};

// Section.Changelog
// =============================================================================

interface SectionChangelogProps {
  changelog: string;
}

const SectionChangelog: FC<SectionChangelogProps> = (props) => {
  const { changelog } = props;

  return (
    <div>
      <Typography.H2 mt="1.5rem" style={{ marginBottom: "1rem" }}>
        Change Log
      </Typography.H2>
      <Markdown>{changelog}</Markdown>
    </div>
  );
};

// Section
// =============================================================================

interface SectionProps {
  title: string;
  demoAndCode?: [React.ReactNode, string];
  sourceCode: Record<string, string>;
  changelog: string;
}

type SectionComponent = FC<SectionProps> & {
  Root: typeof SectionRoot;
  Demo: typeof SectionDemo;
  SourceCode: typeof SectionSourceCode;
  Changelog: typeof SectionChangelog;
};

const Section: SectionComponent = (props) => {
  const { title, demoAndCode, sourceCode: files, changelog } = props;

  const [demo, demoCode] = demoAndCode || [];

  return (
    <Section.Root title={title}>
      {demoAndCode && <Section.Demo node={demo} code={demoCode} />}
      <Section.SourceCode files={files} />
      <Section.Changelog changelog={changelog} />
    </Section.Root>
  );
};

Section.displayName = "Section";

Section.Root = SectionRoot;
Section.Demo = SectionDemo;
Section.SourceCode = SectionSourceCode;
Section.Changelog = SectionChangelog;

// CodeBlock
// =============================================================================

interface CodeBlockProps {
  content: string;
  type: string;

  height: string;
  showFullscreenButton: boolean;
  onFullscreen?: () => void;
}

const CodeBlock: FC<CodeBlockProps> = (props) => {
  const { content, type, height, showFullscreenButton, onFullscreen } = props;

  const theme = useTheme();
  const { addToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    addToast("Copied to clipboard!");
  };

  const handleFullscreen = () => {
    onFullscreen?.();
  };

  return (
    <div
      className={styles.codeBlock}
      style={{ "--code-block-height": height } as CSSProperties}
    >
      <ScrollArea className={styles.codeBlockScrollArea}>
        <ScrollArea.Viewport>
          <ScrollArea.Content className={styles.codeBlockContent}>
            <CodeHighlight code={content} lang={type} withLineNumbers={true} />
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea>
      <ButtonGroup className={styles.floatingToolbar}>
        <Tooltip
          label="Copy to clipboard"
          placement="top"
          triggerRender={({ setRef, onClose, onOpen }) => (
            <IconButton
              ref={setRef}
              onClick={handleCopy}
              onMouseLeave={onClose}
              onMouseEnter={onOpen}
            >
              <ClipboardCopy size={"60%"} color={theme.colors.gray["700"]} />
            </IconButton>
          )}
        />
        {showFullscreenButton && (
          <Tooltip
            label="Fullscreen"
            placement="top"
            triggerRender={({ setRef, onClose, onOpen }) => (
              <IconButton
                ref={setRef}
                onClick={handleFullscreen}
                onMouseLeave={onClose}
                onMouseEnter={onOpen}
              >
                <Maximize size={"60%"} color={theme.colors.gray["700"]} />
              </IconButton>
            )}
          />
        )}
      </ButtonGroup>
    </div>
  );
};

// Export
// =============================================================================

export { Section };
