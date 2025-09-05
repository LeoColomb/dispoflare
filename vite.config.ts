import { reactRouter } from '@react-router/dev/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: Env
      context: ExecutionContext
    }
  }
}
export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    reactRouter(),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: true,
  },
})
