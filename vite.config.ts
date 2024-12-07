import { reactRouter } from '@react-router/dev/vite'
import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

declare module 'react-router' {
  interface AppLoadContext {
    cloudflare: {
      env: Env
    }
  }
}

export default defineConfig({
  plugins: [cloudflareDevProxy(), reactRouter(), tsconfigPaths()],
  build: {
    sourcemap: true,
  },
})
