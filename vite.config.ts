import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/mdb-mack-and-co/" : "/",
  plugins: [react()],
  server: { port: 5178, strictPort: true },
});
