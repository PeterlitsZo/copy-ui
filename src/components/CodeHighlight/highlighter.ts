import githubLight from "@shikijs/themes/github-light";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

export const highlighter = await createHighlighterCore({
  themes: [githubLight],
  langs: [
    // Add more languages if needed.
    () => import("@shikijs/langs/typescript"),
    () => import("@shikijs/langs/tsx"),
    () => import("@shikijs/langs/markdown"),
    () => import("@shikijs/langs/scss"),
    () => import("@shikijs/langs/css"),
  ],
  engine: createOnigurumaEngine(import("shiki/wasm")),
});
