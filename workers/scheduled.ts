import { Toucan } from 'toucan-js'

import * as rulesApi from '@/sdk/rules'
import * as zonesApi from '@/sdk/zones'

function shouldAct(date: Date | string | undefined): Boolean {
  return Boolean(date && new Date(date) <= new Date())
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

    await Promise.all(
      rules.map(async (rule) => {
        if (rule.enabled && shouldAct(rule.data?.expire)) {
          rule.enabled = false
          await rulesApi.put(rule, env)
        } else if (shouldAct(rule.data?.remove)) {
          await rulesApi.remove(rule, env)
        } else if (shouldAct(rule.data?.deprecate)) {
          rule.data.forwardTo = rule.actions[0].value
          rule.actions = [
            {
              type: 'worker',
              value: ['dispoflare'],
            },
          ]
          await rulesApi.put(rule, env)
        }
      }),
    )
  } catch (err) {
    sentry.captureException(err)
    throw err
  }
}
