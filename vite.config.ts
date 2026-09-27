import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ command, isPreview }) => {
  const isPagesBuild = command === 'build' || isPreview === true

  return {
    base: isPagesBuild ? '/max/' : '/',
    plugins: [
      react(),
      svgr()
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src')
      }
    }
  }
})
