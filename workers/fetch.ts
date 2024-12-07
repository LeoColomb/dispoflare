import { createRequestHandler, handleAsset } from '@react-router/cloudflare-workers';
import * as build from '@react-router/dev/server-build';
import { Toucan, rewriteFramesIntegration } from 'toucan-js'

// @ts-ignore
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

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
    integrations: [rewriteFramesIntegration({ root: '/' })],
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
    const response = await handleAsset(
      event,
      build,
      env.__STATIC_CONTENT
        ? {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST || manifestJSON,
          }
        : undefined,
    )

    if (!response) {
      return handleRequest(event)
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
