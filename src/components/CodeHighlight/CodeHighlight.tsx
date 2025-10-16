import classNames from "classnames";
import type { ElementContent, Root, RootContent } from "hast";
import { toHtml } from "hast-util-to-html";
import { type CSSProperties, type FC, useMemo } from "react";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./CodeHighlight.module.scss";
import { highlighter } from "./highlighter";

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
    lineHighlight = null,
    style,
    px,
    py,
  } = props;

  const theme = useTheme();

  const html = useMemo(() => {
    function transformCode(
      node: RootContent,
    ): { lineNumbersChildren: ElementContent[] } | null {
      if (node.type === "element" && node.tagName === "code") {
        let lineNo = 1;
        const lineNumbersChildren = [] as ElementContent[];
        const nodeChildren = [] as ElementContent[];
        node.children.forEach((child) => {
          // Process each line.
          if (
            child.type === "element" &&
            child.tagName === "span" &&
            child.properties.class === "line"
          ) {
            // Check if this line is highlighted.
            let highlighted = false;
            if (lineHighlight !== null) {
              if (lineNo >= lineHighlight.ge && lineNo < lineHighlight.lt) {
                highlighted = true;
              }
            }

            // Add a new child for line-numbers.
            lineNumbersChildren.push({
              type: "element",
              tagName: "span",
              properties: {
                class: styles.codeHighlightLineNumber,
                "data-highlighted": highlighted ? "true" : undefined,
              },
              children: [{ type: "text", value: String(lineNo++) }],
            });

            // Transform child.
            child.children = [
              JSON.parse(JSON.stringify(child)),
              { type: "text", value: "\n" },
            ];
            child.tagName = "div";
            child.properties.class = classNames(
              child.properties.class,
              styles.codeHighlightLine,
            );
            child.properties["data-highlighted"] = highlighted
              ? "true"
              : undefined;
            child.properties["data-with-line-number"] = withLineNumbers
              ? "true"
              : undefined;

            nodeChildren.push(child);
          }
        });
        node.children = nodeChildren;

        if (!withLineNumbers) {
          return null;
        }
        return { lineNumbersChildren };
      }

      return null;
    }

    function transformPre(
      node: RootContent,
    ): { lineNumbersChildren: ElementContent[] } | null {
      if (node.type === "element" && node.tagName === "pre") {
        // Hack to make background-color of <pre> transparent.
        const originalStyle = node.properties.style;
        if (typeof originalStyle === "string") {
          let newStyle = "";
          originalStyle.split(";").forEach((style) => {
            const [key, value] = style.split(":").map((s) => s.trim());
            if (key && value) {
              if (key === "background-color") {
                newStyle += `${key}:transparent;`;
              } else {
                newStyle += `${key}:${value};`;
              }
            }
          });
          node.properties.style = newStyle;
        }

        // Add class.
        node.properties.class = classNames(
          node.properties.class,
          styles.codeHighlightPre,
        );

        // Transform <code>.
        let res = null;
        node.children.forEach((child) => {
          res = transformCode(child);
        });
        return res;
      }

      return null;
    }

    function transformRoot(node: Root) {
      if (node.type === "root") {
        node.children.forEach((child) => {
          const res = transformPre(child);
          if (res != null) {
            const lineNumbers = {
              type: "element",
              tagName: "div",
              properties: { class: styles.codeHighlightLineNumbers },
              children: res.lineNumbersChildren,
            } as ElementContent;
            node.children.unshift(lineNumbers);
          }
        });
      }
    }

    const ast = highlighter.codeToHast(code, {
      lang: lang,
      theme: "github-light",
    });
    transformRoot(ast);
    return toHtml(ast);
  }, [code, lang, withLineNumbers, lineHighlight]);

  const computedStyle = {
    "--code-highlight-line-numbers-color": theme.colors.gray["500"],
    "--code-highlight-line-number-highlight-color": theme.colors.gray["600"],
    "--code-highlight-line-number-highlight-bg": theme.colors.gray["100"],
    "--code-highlight-line-highlight-bg": theme.colors.gray["100"],
    "--code-highlight-px": px ?? "0",
    "--code-highlight-py": py ?? "0",
    ...style,
  } as CSSProperties;

  return (
    <div
      className={styles.codeHighlight}
      style={{ ...computedStyle }}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: shikijs think it is safe.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

CodeHighlight.displayName = "CodeHighlight";
