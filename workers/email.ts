import { Toucan } from 'toucan-js'

import { list } from 'sdk/rules'

export const email = async (
  message: EmailMessage,
  env: Env,
  ctx: ExecutionContext,
): Promise<void> => {
  const sentry = new Toucan({
    dsn: env.SENTRY_DSN,
    context: ctx,
  })

  try {
    const rules = await (await list(env)).json()
    message.setReject('Expired')
  } catch (err) {
    sentry.captureException(err)
    throw err
  }
}
