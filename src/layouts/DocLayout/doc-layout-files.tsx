import classNames from "classnames";
import { ClipboardCopy, Maximize } from "lucide-react";
import { type CSSProperties, type FC, useRef, useState } from "react";

import { ButtonGroup } from "@/components/ButtonGroup";
import { CodeHighlight } from "@/components/CodeHighlight";
import { useJss, useTheme } from "@/components/CopyUiProvider";
import { IconButton } from "@/components/IconButton";
import { Modal } from "@/components/Modal";
import { ScrollArea } from "@/components/ScrollArea";
import { useToast } from "@/components/Toast";
import { Tooltip } from "@/components/Tooltip";

import styles from "./doc-layout-files.module.scss";

interface DocLayoutFilesProps {
  files: Record<string, string>;
}

const DocLayoutFiles: FC<DocLayoutFilesProps> = (props) => {
  const { files } = props;

  const theme = useTheme();
  const jss = useJss();

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
      css: "css",
    }[currentFilename.split(".").pop() ?? ""] || "none";
  const fileContentToShow =
    Object.entries(files).find(
      ([filename]) => filename === currentFilename,
    )?.[1] || "";

  const sourceCodeTree = (
    <div className={styles.sourceCodeTree}>
      {Object.keys(files)
        .sort()
        .map((filename) => (
          <FilesTreeItem
            key={filename}
            filename={filename}
            active={filename === currentFilename}
            onClick={() => setCurrentFilename(filename)}
          />
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

  const stx = jss.hash({
    "--border-color": theme.colors.gray["200"],
    "--background-color": theme.colors.gray["000"],
  });

  return (
    <>
      <div className={classNames(styles.sourceCode, stx)}>
        {sourceCodeTree}
        {sourceCodeBlock(true, "calc(90vh - 3rem)")}
      </div>
      <Modal isOpen={isModalOpen} className={stx}>
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

type FilesTreeItemProps = {
  filename: string;
  active: boolean;
  onClick: () => void;
};

const FilesTreeItem: FC<FilesTreeItemProps> = (props) => {
  const { filename, active, onClick } = props;

  const openTooltipRef = useRef<null | (() => void)>(null);
  const closeTooltipRef = useRef<null | (() => void)>(null);
  const timeoutIdRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = () => {
    timeoutIdRef.current = setTimeout(() => {
      openTooltipRef.current?.();
    }, 750);
  };

  const handleMouseLeave = () => {
    closeTooltipRef.current?.();
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  return (
    <Tooltip
      anchor="pointer"
      label={filename}
      placement="bottom-start"
      triggerRender={({ setRef, onOpen, onClose }) => {
        openTooltipRef.current = onOpen;
        closeTooltipRef.current = onClose;

        return (
          <button
            ref={setRef}
            key={filename}
            className={classNames(
              styles.sourceCodeTreeFilename,
              active && styles.active,
            )}
            onClick={() => onClick()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            type="button"
          >
            {filename}
          </button>
        );
      }}
    />
  );
};

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
