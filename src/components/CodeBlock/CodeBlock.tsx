import type { FC } from "react";

import { CodeHighlight } from "@/components/CodeHighlight";
import { ScrollArea } from "@/components/ScrollArea";
import { useTheme } from "@/components/ThemeProvider";

type CodeBlockProp = {
  className?: string;

  code: string;
  lang: string;
  withLineNumbers?: boolean;

  height?: string | number;
  maxHeight?: string | number;
};

const CodeBlock: FC<CodeBlockProp> = (props) => {
  const { className, code, lang, withLineNumbers, height, maxHeight } = props;

  const theme = useTheme();

  return (
    <ScrollArea className={className}>
      <ScrollArea.Viewport
        style={{
          height: height,
          maxHeight: maxHeight,
          borderRadius: "0.375rem",
          backgroundColor: theme.colors.gray["000"],
        }}
      >
        <ScrollArea.Content style={{ padding: "1rem", fontSize: "0.875rem" }}>
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
  );
};

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
