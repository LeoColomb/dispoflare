/** @type {import('@remix-run/dev').AppConfig} */
export default {
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  server: './pages/server.js',
  serverBuildPath: 'functions/[[path]].js',
  serverConditions: ['worker'],
  serverDependenciesToBundle: 'all',
  serverMainFields: ['browser', 'module', 'main'],
  serverMinify: true,
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  appDirectory: "pages/app",
  assetsBuildDirectory: "pages/public/build",
  // publicPath: "/build/",
}
