import lightPlus from "@shikijs/themes/light-plus";
import { type CSSProperties, type FC, useMemo } from "react";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

import { useTheme } from "@/components/ThemeProvider";

import styles from "./CodeHighlight.module.scss";

interface CodeHighlightProps {
  code: string;
  lang: string;
  withLineNumbers?: boolean;
}

export const CodeHighlight: FC<CodeHighlightProps> = (props) => {
  const { code, lang, withLineNumbers = false } = props;

  const theme = useTheme();

  const html = useMemo(() => {
    return highlighter.codeToHtml(code, {
      lang: lang,
      theme: "light-plus",
    });
  }, [code, lang]);

  const computedStyle = {
    "--code-highlight-line-numbers-color": theme.colors.gray["500"],
  } as CSSProperties;

  if (!withLineNumbers) {
    return (
      <div
        className={styles.codeHighlight}
        style={{ ...computedStyle }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: shikijs think it is safe.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } else {
    // Generate line numbers.
    const lineNumbers = [] as number[];
    code.split("\n").forEach((_, i) => {
      lineNumbers.push(i + 1);
    });
    if (code.endsWith("\n")) {
      lineNumbers.pop();
    }

    return (
      <div
        className={styles.codeHighlight}
        style={{ ...computedStyle }}
        data-with-line-number="true"
      >
        <div className={styles.codeHighlightLineNumbers}>
          {lineNumbers.map((i) => (
            <div key={i}>{i}</div>
          ))}
        </div>
        {/** biome-ignore lint/security/noDangerouslySetInnerHtml: shikijs think it is safe */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
};

CodeHighlight.displayName = "CodeHighlight";

const highlighter = await createHighlighterCore({
  themes: [
    {
      ...lightPlus,
      colors: { ...lightPlus.colors, "editor.background": "transparent" },
    },
  ],
  langs: [
    () => import("@shikijs/langs/typescript"),
    () => import("@shikijs/langs/tsx"),
    () => import("@shikijs/langs/markdown"),
    () => import("@shikijs/langs/scss"),
  ],
  engine: createOnigurumaEngine(import("shiki/wasm")),
});
