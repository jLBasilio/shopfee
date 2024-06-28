import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3030
  },
  build: {
    minify: true,
    rollupOptions: {
      input: {
        serviceWorker: resolve(__dirname, 'src', 'serviceWorker.ts'),
        'assets/index': resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: ({name}) => {
          if (name === 'serviceWorker') {
            return '[name].js'
          }

          return '[name]-[hash].js'
        }
      }
    }
  }
})
