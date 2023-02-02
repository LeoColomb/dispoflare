import { withEsbuildOverride } from 'remix-esbuild-override'

withEsbuildOverride((option, { isServer, isDev }) => {
  if (
    option.entryPoints &&
    Array.isArray(option.entryPoints) &&
    option.entryPoints.includes('./server.ts')
  ) {
    if (!option.external) {
      option.external = ['__STATIC_CONTENT_MANIFEST']
    }
  }
  return option
})

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  serverBuildTarget: 'cloudflare-workers',
  server: './server.ts',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: 'app',
  // assetsBuildDirectory: 'public/build',
  // publicPath: '/build/',
}
