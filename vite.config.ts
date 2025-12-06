import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import pkg from "./package.json";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),

    react(),

    tsconfigPaths(),

    process.env.HTTPS && mkcert(),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  publicDir: "./public",
  server: {
    host: true,
  },
});
