import {
  createRequestHandler,
  handleAsset,
} from '@remix-run/cloudflare-workers'
import * as build from '@remix-run/dev/server-build'
import { Toucan } from 'toucan-js'
import { RewriteFrames } from '@sentry/integrations'

const handleRequest = createRequestHandler({
  build,
  getLoadContext: (context) => ({
    ...context.env,
    cf: (context.request as any).cf as IncomingRequestCfProperties | undefined,
  }),
  mode: process.env.NODE_ENV,
})

export const fetch = async (
  request: Request,
  env: Env,
  context: ExecutionContext,
): Promise<Response> => {
  const sentry = new Toucan({
    dsn: env.SENTRY_DSN,
    context,
    request,
    integrations: [new RewriteFrames({ root: '/' })],
  })
  sentry.configureScope((scope) => scope.setExtras(env))
  const event: FetchEvent = {
    env,
    params: {},
    request,
    waitUntil: context.waitUntil,
    next: () => {
      throw new Error('next() called in Worker')
    },
    functionPath: '',
    data: undefined,
  }
  try {
    let response = await handleAsset(event, build, {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: JSON.parse(env.__STATIC_CONTENT_MANIFEST),
    })

    if (!response) {
      response = await handleRequest(event)
    }

    return response
  } catch (err: any) {
    sentry.captureException(err)

    return new Response(err.message || err.toString(), {
      status: 500,
    })
    return new Response('Something went wrong! Team has been notified.', {
      status: 500,
    })
  }
}
