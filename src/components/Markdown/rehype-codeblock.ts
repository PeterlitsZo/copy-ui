import type { Node } from "unist";

function rehypeCodeblock() {
  type NodeWithChildren = Node & {
    children?: Node[];
    value?: string;
  };

  return (ast: NodeWithChildren) => {
    flatMap(ast, (node) => {
      if (
        node.type === "element" &&
        "tagName" in node &&
        node.tagName === "pre"
      ) {
        // Get the code text & the language.
        let codeText = "";
        let language = "";
        if (
          "children" in node &&
          Array.isArray(node.children) &&
          node.children.length > 0
        ) {
          for (const child of node.children) {
            if (
              child.type === "element" &&
              "tagName" in child &&
              child.tagName === "code"
            ) {
              if (
                "properties" in child &&
                child.properties &&
                "className" in child.properties
              ) {
                const classNames = child.properties.className as string[];
                for (const className of classNames) {
                  if (
                    typeof className === "string" &&
                    className.startsWith("language-")
                  ) {
                    language = className.replace("language-", "");
                  }
                }
              }

              if ("children" in child && Array.isArray(child.children)) {
                for (const codeChild of child.children) {
                  if (codeChild.type === "text" && "value" in codeChild) {
                    codeText += codeChild.value;
                  }
                }
              }
            }
          }
        }

        return [
          {
            type: "element",
            tagName: "copy-ui-hack-codeblock",
            properties: {
              lang: language,
              code: codeText,
            },
            children: [],
          },
        ];
      }
      return [node];
    });
    return ast;
  };
}

/**
 * Walks through a AST and maps a function over each node.
 *
 * Inspired by unist-util-flatmap.
 */
function flatMap(node: Node, fn: (node: Node) => Node[]) {
  return transform(node);

  function transform(node: Node): Node | Node[] {
    if ("children" in node && Array.isArray(node.children)) {
      const out = [];
      for (let i = 0; i < node.children.length; i++) {
        const result = transform(node.children[i]);
        if (Array.isArray(result)) {
          out.push(...result);
        } else {
          out.push(result);
        }
      }
      node.children = out;
    }
    return fn(node);
  }
}

export { rehypeCodeblock };
