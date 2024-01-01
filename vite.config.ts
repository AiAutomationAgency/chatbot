// vite.config.js

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
// import react from "@vitejs/plugin-react-swc";

import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  esbuild: {
    loader: "jsx",
  },

  build: {
    outDir: "build",
  },

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },

  // depending on your application, base can also be "/"
  base: "",

  plugins: [
    react(),
    viteTsconfigPaths(),

    // { enforce: "pre", ...mdx() },
    // react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),

    // svgrPlugin({
    //   svgrOptions: {
    //     icon: true,
    //     // ...svgr options (https://react-svgr.com/docs/options/)
    //   },
    // }),
  ],

  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
});
