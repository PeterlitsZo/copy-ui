import path from "node:path";

import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from '@mdx-js/rollup';

import { rehypeCodeblock } from "./src/plugins/rehype-codeblock";

export default defineConfig({
  build: {
    target: ["chrome107", "edge107", "firefox104", "safari16"],
  },
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        rehypePlugins: [rehypeCodeblock],
        providerImportSource: '@mdx-js/react',
        include: /.*\.mdx$/,
      }),
    },
    reactRouter(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
