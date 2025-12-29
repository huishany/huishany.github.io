import { defineConfig } from 'vite'
import pugPlugin from 'vite-plugin-pug'

export default defineConfig({
  plugins: [pugPlugin()],
  base: process.env.VITE_BASE_PATH || "/huishany.github.io",
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
