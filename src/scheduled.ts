import { getRules } from './api'

export const scheduled = async (
  controller: ScheduledController,
  env: Env,
  ctx: ExecutionContext,
): Promise<void> => {
  const rules = await getRules({ env })
  rules.json()
}
