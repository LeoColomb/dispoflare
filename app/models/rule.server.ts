import { AppLoadContext } from 'react-router'
import * as rules from 'sdk/rules.js'

export async function getRules(
  zones: Zone[] | Promise<Zone[]>,
  context: AppLoadContext,
): Promise<Array<Rule>> {
  return rules.list(await zones, context.cloudflare.env)
}

export async function createRule(
  {
    rule,
    zone,
    address,
    expire,
    remove,
  }: {
    rule: string
    zone: Zone
    address: string
    expire: string
    remove: Date | boolean
  },
  context: AppLoadContext,
): Promise<void> {
  if (remove === true) {
    remove = new Date(expire)
    remove.setMonth(remove.getMonth() + 1)
  }
  await rules.post(
    {
      actions: [
        {
          type: 'forward',
          value: [address],
        },
      ],
      enabled: true,
      matchers: [
        {
          field: 'to',
          type: 'literal',
          value: `${rule}@${zone.name}`,
        },
      ],
      name: JSON.stringify({
        dispoflare: true,
        activate: new Date(),
        expire,
        remove,
      }),
    },
    zone,
    context.cloudflare.env,
  )
}

export async function dropRule(
  rule: Rule,
  context: AppLoadContext,
): Promise<void> {
  await rules.remove(rule, context.cloudflare.env)
}

export async function updateRule(
  rule: Rule,
  context: AppLoadContext,
): Promise<Rule> {
  return rules.put(rule, context.cloudflare.env)
}
