/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  server: './pages/server.ts',
  serverBuildPath: 'functions/[[path]].js',
  serverConditions: ['worker'],
  serverDependenciesToBundle: 'all',
  serverMainFields: ['browser', 'module', 'main'],
  serverMinify: true,
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  appDirectory: 'pages/app',
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  serverNodeBuiltinsPolyfill: {
    modules: {},
  },
}
