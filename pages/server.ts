import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'
import * as build from '@remix-run/dev/server-build'

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => ({
    ...context.env,
    CF: (context.request as any).cf as IncomingRequestCfProperties | undefined,
  }),
})

const handler: ExportedHandler<Env> = {
  fetch: async (req, env, ctx) => {
    const r = new Request(req)
    return handleRequest({
      env,
      params: {},
      request: r,
      waitUntil: ctx.waitUntil,
      next: () => {
        throw new Error('next() called in Worker')
      },
      functionPath: '',
      data: undefined,
    })
  },
}
