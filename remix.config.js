/** @type {import('@remix-run/dev').AppConfig} */
export default {
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  server: './pages/server.ts',
  serverBuildPath: 'functions/[[path]].js',
  serverConditions: ['worker'],
  // serverDependenciesToBundle: 'all',
  serverMainFields: ['browser', 'module', 'main'],
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  appDirectory: 'pages/app',
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
}
