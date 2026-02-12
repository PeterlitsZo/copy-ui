import classNames from "classnames";
import type { ElementContent, Root, RootContent } from "hast";

function transformCode(
  node: RootContent,
  opts: {
    withLineNumbers: boolean;
    lineHighlight?: { ge: number; lt: number };
    lineNumberClassName: string;
    lineHighlightClassName: string;
  },
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
        if (opts.lineHighlight != null) {
          if (
            lineNo >= opts.lineHighlight.ge &&
            lineNo < opts.lineHighlight.lt
          ) {
            highlighted = true;
          }
        }

        // Add a new child for line-numbers.
        lineNumbersChildren.push({
          type: "element",
          tagName: "span",
          properties: {
            class: opts.lineNumberClassName, // styles.codeHighlightLineNumber,
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
          opts.lineHighlightClassName, // styles.codeHighlightLine,
        );
        child.properties["data-highlighted"] = highlighted ? "true" : undefined;
        child.properties["data-with-line-number"] = opts.withLineNumbers
          ? "true"
          : undefined;

        nodeChildren.push(child);
      }
    });
    node.children = nodeChildren;

    if (!opts.withLineNumbers) {
      return null;
    }
    return { lineNumbersChildren };
  }

  return null;
}

function transformPre(
  node: RootContent,
  opts: {
    withLineNumbers: boolean;
    lineHighlight?: { ge: number; lt: number };
    lineNumberClassName: string;
    lineHighlightClassName: string;
    preClassName: string;
  },
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
      opts.preClassName, // styles.codeHighlightPre,
    );

    // Transform <code>.
    let res = null;
    node.children.forEach((child) => {
      res = transformCode(child, opts);
    });
    return res;
  }

  return null;
}

function transformRoot(
  node: Root,
  opts: {
    withLineNumbers: boolean;
    lineHighlight?: { ge: number; lt: number };
    lineNumberClassName: string;
    lineNumberContainerClassName: string;
    lineHighlightClassName: string;
    preClassName: string;
  },
) {
  if (node.type === "root") {
    node.children.forEach((child) => {
      const res = transformPre(child, opts);
      if (res != null) {
        const lineNumbers = {
          type: "element",
          tagName: "div",
          properties: { class: opts.lineNumberContainerClassName },
          children: res.lineNumbersChildren,
        } as ElementContent;
        node.children.unshift(lineNumbers);
      }
    });
  }
}

export { transformRoot };
