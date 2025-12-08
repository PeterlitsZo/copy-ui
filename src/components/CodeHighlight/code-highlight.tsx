import classNames from "classnames";
import { toHtml } from "hast-util-to-html";
import { type CSSProperties, type FC, useMemo } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./code-highlight.module.css";
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
    "--codeHighlightLineNumbers-color": theme.colors.gray["500"],
    "--codeHighlightLineNumber-highlighted-color": theme.colors.gray["600"],
    "--codeHighlightLineNumber-highlighted-bgColor": theme.colors.gray["100"],
    "--codeHighlightLine-highlighted-bgColor": theme.colors.gray["100"],
    "--codeHighlight-px": px ?? "0",
    "--codeHighlight-py": py ?? "0",
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
