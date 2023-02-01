import { Toucan } from 'toucan-js'

import * as rulesApi from 'sdk/rules'
import * as zonesApi from 'sdk/zones'

function shouldAct(date: Date | string | undefined): Boolean {
  const now = new Date()
  return Boolean(date && new Date(date) <= now)
}

export const scheduled = async (
  event: ScheduledEvent,
  env: Env,
  ctx: ExecutionContext,
): Promise<void> => {
  const sentry = new Toucan({
    dsn: env.SENTRY_DSN,
    context: ctx,
    event,
  })

  try {
    const zones = await zonesApi.list(env)
    const rules = await rulesApi.list(zones, env)

    rules.forEach((rule) => {
      if (rule.enabled && shouldAct(rule.data?.expire)) {
        rule.enabled = false
        rulesApi.put(rule, env)
      } else if (shouldAct(rule.data?.remove)) {
        rulesApi.remove(rule, env)
      } else if (shouldAct(rule.data?.deprecate)) {
        rule.actions = [
          {
            type: 'worker',
            value: ['dispoflare'],
          },
        ]
      }
    })
  } catch (err) {
    sentry.captureException(err)
    throw err
  }
}
