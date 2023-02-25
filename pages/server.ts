import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'
import * as build from '@remix-run/dev/server-build'

export const onRequest: PagesFunction<Env> = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => ({
    ...context.env,
    CF: (context.request as any).cf as IncomingRequestCfProperties | undefined,
  }),
})
