import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// o'zingizni Cloudflare linkini shu yerga yozing
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src"), }, },
  server: {
  allowedHosts: ['.trycloudflare.com']
}
})
