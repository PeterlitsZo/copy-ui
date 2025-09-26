import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths()
  ],
});
