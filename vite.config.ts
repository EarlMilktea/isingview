import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  build: {
    target: ["esnext"],
  },
  plugins: [react()],
  worker: {
    format: "es",
  },
});
