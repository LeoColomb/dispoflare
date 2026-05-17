import { reactRouter } from '@react-router/dev/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: Env
      context: ExecutionContext
    }
  }
}
export default defineConfig({
  plugins: [cloudflare({ viteEnvironment: { name: 'ssr' } }), reactRouter()],
  build: {
    sourcemap: true,
  },
  resolve: { tsconfigPaths: true },
})
