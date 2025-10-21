import type { CSSProperties, FC, ReactNode } from "react";
import { Background } from "@/components/Background";
import { CodeHighlight } from "@/components/CodeHighlight";
import { ScrollArea } from "@/components/ScrollArea";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./doc-layout-live.module.scss";

type DocLayoutLiveProps = {
  code: string;
  node: ReactNode;
};

const DocLayoutLive: FC<DocLayoutLiveProps> = (props) => {
  const { code, node } = props;

  const theme = useTheme();

  const stx = {
    "--doc-layout-live-border-color": theme.colors.gray["300"],
    "--doc-layout-live-background-color": theme.colors.gray["000"],
  } as CSSProperties;

  return (
    <div className={styles.docLayoutLive} style={stx}>
      <div className={styles.docLayoutLiveNode}>
        <Background kind="dots" />
        <div style={{ position: "relative" }}>{node}</div>
      </div>
      <ScrollArea className={styles.docLayoutLiveCode}>
        <ScrollArea.Viewport className={styles.docLayoutLiveCodeViewport}>
          <ScrollArea.Content className={styles.docLayoutLiveCodeContent}>
            <CodeHighlight code={code} lang="tsx" withLineNumbers />
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea>
    </div>
  );
};

export { DocLayoutLive };
