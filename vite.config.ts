import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const prod = process.env.NODE_ENV === "production";
const dev = !prod;
const host = process.env.HOST || "0.0.0.0";
const port = parseInt(process.env.PORT || "9000");

export default defineConfig(({ mode }) => ({
  base: mode === "gh-pages" ? `/gof/` : "./",
  server: {
    host,
    port,
    open: true,
    strictPort: true,
    sourcemapIgnoreList: () => true,
    watch: {
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/dist/**",
        "**/build/**",
        "**/.github/**",
        "**/.vscode/**",
        "**/assets/**",
        "**/public/**",
      ],
    },
  },
  clearScreen: false,
  build: { chunkSizeWarningLimit: 2000, sourcemap: false },
  hmr: host ? { protocol: "ws", host, port: port + 1 } : undefined,
  esbuild: { sourcemap: false },
  plugins: [react(), tailwindcss()],
}));
