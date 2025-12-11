import classNames from "classnames";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { ScrollArea } from "@/components/ScrollArea";

import styles from "./index.module.css";

export default function Demo() {
  const theme = useTheme();
  const jss = useJss();

  const rootStyle = {
    border: `1px solid ${theme.colors.gray["300"]}`,
  };

  const blockStyle = jss.hash({
    backgroundColor: theme.colors.gray["100"],
    border: `1px solid ${theme.colors.gray["300"]}`,
  });

  const blocks = Array.from({ length: 100 }).map((_, index) => ({
    id: `block-${index}`,
  }));

  return (
    <ScrollArea className={styles.root} style={rootStyle}>
      <ScrollArea.Viewport>
        <ScrollArea.Content className={styles.content}>
          {blocks.map((block) => (
            <div
              key={block.id}
              className={classNames(styles.block, blockStyle)}
            >
              {block.id}
            </div>
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.ScrollbarWithThumb orientation="vertical" />
      <ScrollArea.ScrollbarWithThumb orientation="horizontal" />
    </ScrollArea>
  );
}
