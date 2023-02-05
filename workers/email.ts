import { Toucan } from 'toucan-js'

import { list as listRules } from 'sdk/rules'

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
    const rules: Rule[] = await listRules(env)
    const matchingRule: Rule | undefined = rules.find(
      (rule) => rule.matchers[0].value === message.to,
    )
    if (matchingRule) {
      const headers = new Headers([
        ['X-Dispoflare-Deprecated', `expire=${matchingRule.data.expire}`],
      ])

      message.forward(matchingRule.data.forwardTo, headers)
    }
  } catch (err) {
    sentry.captureException(err)

    message.setReject('Processing Error')
    throw err
  }
}
