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

export default {
  fetch: async (
    request: Request,
    env: Env,
    context: ExecutionContext,
  ): Promise<Response> =>
    handleRequest({
      env,
      params: {},
      request: new Request(request),
      waitUntil: context.waitUntil,
      next: () => {
        throw new Error('next() called in Worker')
      },
      functionPath: '',
      data: undefined,
    }),
}
