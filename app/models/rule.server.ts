import { AppLoadContext } from '@remix-run/cloudflare'
import * as rules from 'sdk/rules'

export async function getRules(
  zones: Zone[],
  context: AppLoadContext,
): Promise<Array<Rule>> {
  return rules.list(zones, context)
}

export async function createRule(
  {
    rule,
    zone,
    address,
    expire,
  }: { rule: string; zone: Zone; address: string; expire: string },
  context: AppLoadContext,
): Promise<void> {
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
        expire,
      }),
    },
    zone,
    context,
  )
}

export async function dropRule(
  rule: Rule,
  context: AppLoadContext,
): Promise<void> {
  await rules.remove(rule, context)
}

export async function updateRule(
  rule: Rule,
  context: AppLoadContext,
): Promise<Rule> {
  return rules.put(rule, context)
}
