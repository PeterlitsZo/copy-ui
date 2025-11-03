import classNames from "classnames";
import { type FC, useRef } from "react";

import { CodeHighlight } from "@/components/CodeHighlight";
import { useJss } from "@/components/CopyUiProvider";
import { ScrollArea } from "@/components/ScrollArea";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./code-block.module.scss";

type CodeBlockProp = {
  /** The `className` for root. */
  className?: string;

  /** The code to display. */
  code: string;
  /** The language of the code. */
  lang: string;

  /** The title of the code block (e.g. a filename). */
  title?: string;
  /** Whether to show line numbers. */
  withLineNumbers?: boolean;

  /** The height of the code block's scroll-area. */
  scrollAreaHeight?: string;
  /** The max-height of the code block's scroll-area. */
  scrollAreaMaxHeight?: string;
};

const CodeBlock: FC<CodeBlockProp> = (props) => {
  const {
    className,
    code,
    lang,
    title,
    withLineNumbers,
    scrollAreaHeight,
    scrollAreaMaxHeight,
  } = props;

  const theme = useTheme();
  const jss = useJss();

  const scrollContentRef = useRef<HTMLDivElement>(null);

  const scrollAreaSizeStx = jss.hash({
    height: scrollAreaHeight,
    maxHeight: scrollAreaMaxHeight,
  });

  const codeBlockStx = jss.hash({
    "--code-block-border-radius": "0.375rem",
    "--code-block-bg-color": theme.colors.gray["000"],
    "--code-block-title-color": theme.colors.gray["600"],
    "--code-block-title-px": "0.75rem",
    "--code-block-title-py": "0.5rem",
    "--code-block-title-border-bottom-color": theme.colors.gray["200"],
  });

  return (
    <div className={classNames(styles.codeBlock, codeBlockStx, className)}>
      {title && <div className={styles.codeBlockTitle}>{title}</div>}
      <ScrollArea>
        <ScrollArea.Viewport className={scrollAreaSizeStx}>
          <ScrollArea.Content
            ref={scrollContentRef}
            className={styles.codeBlockScrollAreaContent}
          >
            <CodeHighlight
              code={code}
              lang={lang}
              withLineNumbers={withLineNumbers}
            />
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea>
    </div>
  );
};

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
