/**
 * A simple CSS-in-JS utility function.
 *
 * Inspired by goober.
 */

import type { CSSProperties } from "react";

type Style = CSSProperties | Partial<Record<`--${string}`, string>>;

function toHash(str: string): string {
  let i = 0,
    out = 11;
  while (i < str.length) out = (101 * out + str.charCodeAt(i++)) >>> 0;
  return out.toString();
}

type JssState = {
  hash: (style: Style) => string;
  extractSsrCss: () => string;
};

function createJssState(): JssState {
  const jssState = {
    cache: {} as Record<string, string>,
    ssr: { kind: "copy-ui-jss-ssr" as const, data: "" },

    getSheet(): Text | { kind: "copy-ui-jss-ssr"; data: string } {
      if (typeof document !== "undefined") {
        let sheet = document.getElementById(
          "copy-ui-jss",
        ) as HTMLStyleElement | null;
        if (!sheet) {
          sheet = document.createElement("style");
          sheet.id = "copy-ui-jss";
          document.head.appendChild(sheet);
        }
        if (sheet.firstChild === null) {
          const text = document.createTextNode("");
          sheet.appendChild(text);
          return text;
        }
        return sheet.firstChild as Text;
      }

      return this.ssr;
    },
    hash(style: Style): string {
      const str = JSON.stringify(style);

      // Get the `className` by `style`.
      let className: string;
      if (this.cache[str]) {
        className = this.cache[str];
      } else {
        className = `copy-ui-${toHash(str)}`;
        this.cache[str] = className;
      }

      // Get the CSS to insert if needed.
      if (!this.cache[className]) {
        let css = `.${className} {`;
        for (const key in style) {
          const normalizeKey = key.replace(
            /[A-Z]/g,
            (match) => `-${match.toLowerCase()}`,
          );
          css += `${normalizeKey}:${style[key as keyof Style]};`;
        }
        css += "}";

        this.cache[className] = css;

        // Insert the CSS into the stylesheet.
        const sheet = this.getSheet();
        sheet.data += css;
      }

      return className;
    },
    extractSsrCss(): string {
      const sheet = this.getSheet();
      if ("kind" in sheet && sheet.kind === "copy-ui-jss-ssr") {
        const out = sheet.data;
        sheet.data = "";
        return out;
      }
      return "";
    },
  };

  return jssState;
}

export type { JssState };
export { createJssState };
