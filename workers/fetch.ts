import { Toucan, rewriteFramesIntegration } from 'toucan-js'
import { createRequestHandler, RouterContextProvider } from 'react-router'

import { cloudflareContext } from '@/app/lib/cloudflare'

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE,
)

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
  // sentry.configureScope((scope) => scope.setExtras(env))

  try {
    const loadContext = new RouterContextProvider()
    loadContext.set(cloudflareContext, { env, context })

    return await requestHandler(request, loadContext)
  } catch (err: any) {
    console.error('Request handling failed', err)
    sentry.captureException(err)

    return new Response(err.message || err.toString(), {
      status: 500,
    })
  }
}
