import type { FC } from "react";
import ReactMarkdown from "react-markdown";

import { Typography } from "@/components/Typography";

type MarkdownProps = {
  children: string;
};

export const Markdown: FC<MarkdownProps> = (props) => {
  const { children } = props;

  return (
    <ReactMarkdown
      components={{
        h1: Typography.H1,
        h2: Typography.H2,
        h3: Typography.H3,
        h4: Typography.H4,
        p: Typography.P,
        ul: Typography.Ul,
        li: Typography.Li,
        code: Typography.Code,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
