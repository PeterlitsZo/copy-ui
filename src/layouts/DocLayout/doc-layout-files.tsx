import classNames from "classnames";
import { ClipboardCopy, Maximize } from "lucide-react";
import { type CSSProperties, type FC, useState } from "react";

import { ButtonGroup } from "@/components/ButtonGroup";
import { CodeHighlight } from "@/components/CodeHighlight";
import { IconButton } from "@/components/IconButton";
import { Modal } from "@/components/Modal";
import { ScrollArea } from "@/components/ScrollArea";
import type { Theme } from "@/components/ThemeProvider";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/components/Toast";
import { Tooltip } from "@/components/Tooltip";

import styles from "./doc-layout-files.module.scss";

const rootStyle = (theme: Theme) =>
  ({
    "--border-color": theme.colors.gray["200"],
    "--background-color": theme.colors.gray["000"],
  }) as CSSProperties;

interface DocLayoutFilesProps {
  files: Record<string, string>;
}

const DocLayoutFiles: FC<DocLayoutFilesProps> = (props) => {
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
    <>
      <div className={styles.sourceCode} style={rootStyle(theme)}>
        {sourceCodeTree}
        {sourceCodeBlock(true, "80vh")}
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
    </>
  );
};

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

export { DocLayoutFiles };
