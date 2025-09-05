import { Toucan, rewriteFramesIntegration } from 'toucan-js'
import { createRequestHandler } from 'react-router'

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
    return requestHandler(request, {
      cloudflare: { env, context },
    })
  } catch (err: any) {
    sentry.captureException(err)

    return new Response(err.message || err.toString(), {
      status: 500,
    })
  }
}
