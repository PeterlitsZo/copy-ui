import classNames from "classnames";
import { ClipboardCopy, Maximize } from "lucide-react";
import { type CSSProperties, type FC, useState } from "react";

import { Background } from "@/components/Background";
import { ButtonGroup } from "@/components/ButtonGroup";
import { CodeHighlight } from "@/components/CodeHighlight";
import { IconButton } from "@/components/IconButton";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/components/Toast";
import { Tooltip } from "@/components/Tooltip";
import { ScrollArea } from "../ScrollArea";
import { Typography } from "../Typography";
import styles from "./Section.module.scss";

interface SectionProps {
  title: string;
  demoAndCode?: [React.ReactNode, string];
  sourceCode: Record<string, string>;
  changelog: string;
}

export function Section({
  title,
  demoAndCode,
  sourceCode: files,
  changelog,
}: SectionProps) {
  const theme = useTheme();

  const [demo, demoCode] = demoAndCode || [];

  const [currentFilename, setCurrentFilename] = useState(
    Object.keys(files)[0] || "",
  );
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

  const computedStyle = {
    "--border-color": theme.colors.gray["200"],
    "--background-color": theme.colors.gray["000"],
  } as CSSProperties;

  return (
    <div className={styles.section} style={computedStyle}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderWrapper}>
          <Typography.H1 mt="3rem">{title}</Typography.H1>
        </div>
      </div>
      <div className={styles.sectionBody}>
        <div className={styles.sectionBodyWrapper}>
          {demoAndCode && (
            <div className={styles.demoAndCode}>
              <div className={styles.demo}>
                <Background kind="dots" />
                <div style={{ position: "relative" }}>{demo}</div>
              </div>
              {demoCode && (
                <ScrollArea className={styles.demoCode}>
                  <ScrollArea.Viewport className={styles.demoCodeViewport}>
                    <ScrollArea.Content className={styles.demoCodeContent}>
                      <CodeHighlight code={demoCode} lang="tsx" />
                    </ScrollArea.Content>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar>
                    <ScrollArea.Thumb />
                  </ScrollArea.Scrollbar>
                </ScrollArea>
              )}
            </div>
          )}
          <div>
            <Typography.H2 mt="1.5rem" style={{ marginBottom: "1rem" }}>
              Source Code
            </Typography.H2>
            <div className={styles.sourceCode}>
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
              <div style={{ flex: 1 }}>
                <CodeBlock content={fileContentToShow} type={currentFileType} />
              </div>
            </div>
          </div>
          <div>
            <Typography.H2 mt="1.5rem" style={{ marginBottom: "1rem" }}>
              Change Log
            </Typography.H2>
            <div className={styles.changeLogContent}>
              <CodeHighlight code={changelog} lang="markdown" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
    addToast("Copied to clipboard!");
  };

  const handleFullscreen = () => {
    addToast("WIP...");
  };

  return (
    <div className={styles.codeBlock}>
      <ScrollArea className={styles.codeBlockScrollArea}>
        <ScrollArea.Viewport>
          <ScrollArea.Content className={styles.codeBlockContent}>
            <CodeHighlight code={content} lang={type} />
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
      </ButtonGroup>
    </div>
  );
};
