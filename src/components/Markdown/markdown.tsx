import type { FC } from "react";
import ReactMarkdown from "react-markdown";

import { Typography } from "@/components/Typography";

import { rehypeCodeblock } from "./rehype-codeblock";

type MarkdownProps = {
  children: string;
};

export const Markdown: FC<MarkdownProps> = (props) => {
  const { children } = props;

  return (
    <Typography>
      <ReactMarkdown
        rehypePlugins={[rehypeCodeblock]}
        components={{
          h1: Typography.H1,
          h2: Typography.H2,
          h3: Typography.H3,
          h4: Typography.H4,
          p: Typography.P,
          ul: Typography.Ul,
          ol: Typography.Ol,
          li: Typography.Li,
          strong: Typography.Strong,
          em: Typography.Em,
          code: Typography.Code,

          // @ts-expect-error Oh, well. It is a hack.
          "copy-ui-hack-codeblock": (props: { lang: string; code: string }) => {
            const { lang, code } = props;
            return (
              <Typography.CodeBlock withLineNumbers code={code} lang={lang} />
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </Typography>
  );
};
