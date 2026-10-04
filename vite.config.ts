import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages has no SPA rewrites: serving index.html as 404.html lets deep links boot the app.
function githubPagesFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const dist = resolve(import.meta.dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), githubPagesFallback()],
})
