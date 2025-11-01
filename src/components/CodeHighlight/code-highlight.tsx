import classNames from "classnames";
import { toHtml } from "hast-util-to-html";
import { type CSSProperties, type FC, useMemo } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./code-highlight.module.scss";
import { highlighter } from "./highlighter";
import { transformRoot } from "./transformer";

interface CodeHighlightProps {
  code: string;
  lang: string;

  withLineNumbers?: boolean;
  lineHighlight?: { ge: number; lt: number };

  style?: CSSProperties;

  px?: string;
  py?: string;
}

export const CodeHighlight: FC<CodeHighlightProps> = (props) => {
  const {
    code,
    lang,
    withLineNumbers = false,
    lineHighlight,
    style,
    px,
    py,
  } = props;

  const theme = useTheme();
  const jss = useJss();

  const html = useMemo(() => {
    const ast = highlighter.codeToHast(code, {
      lang: lang,
      theme: "github-light",
    });
    transformRoot(ast, {
      withLineNumbers: withLineNumbers,
      lineHighlight: lineHighlight,
      lineNumberClassName: styles.codeHighlightLineNumber,
      lineNumberContainerClassName: styles.codeHighlightLineNumberContainer,
      lineHighlightClassName: styles.codeHighlightLine,
      preClassName: styles.codeHighlightPre,
    });
    return toHtml(ast);
  }, [code, lang, withLineNumbers, lineHighlight]);

  const stx = jss.hash({
    "--code-highlight-line-numbers-color": theme.colors.gray["500"],
    "--code-highlight-line-number-highlight-color": theme.colors.gray["600"],
    "--code-highlight-line-number-highlight-bg": theme.colors.gray["100"],
    "--code-highlight-line-highlight-bg": theme.colors.gray["100"],
    "--code-highlight-px": px ?? "0",
    "--code-highlight-py": py ?? "0",
  });

  return (
    <div
      className={classNames(styles.codeHighlight, stx)}
      style={style}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: shikijs think it is safe.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

CodeHighlight.displayName = "CodeHighlight";
