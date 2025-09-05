import { fetchAPI } from './global'

export async function list(zones: Zone[], env: Env): Promise<Array<Rule>> {
  const results = await Promise.all(
    zones.map(async (zone: Zone) => {
      // Fetch Cloudflare API
      const api: Array<Rule> = await fetchAPI(
        `zones/${zone.id}/email/routing/rules`,
        'GET',
        env,
      )

      // Keep only Dispoflare managed rules
      const result = api.map((rule: Rule) => {
        try {
          const data: DispoflareData = JSON.parse(rule.name)
          if (data.dispoflare) {
            return {
              ...rule,
              zone,
              data,
            }
          }
        } catch {
          return
        }
      })

      // Clean up
      return result.filter((e) => e?.data?.dispoflare)
    }),
  )

  return results.flat()
}

export async function get(rule: any, zone: Zone, env: Env): Promise<Rule> {
  return fetchAPI(
    `zones/${zone.id}/email/routing/rules/${rule.tag}`,
    'GET',
    env,
  )
}

export async function post(rule: any, zone: Zone, env: Env): Promise<Rule> {
  return fetchAPI(
    `zones/${zone.id}/email/routing/rules`,
    'POST',
    env,
    JSON.stringify(rule),
  )
}

export async function put(rule: Rule, env: Env): Promise<Rule> {
  return fetchAPI(
    `zones/${rule.zone.id}/email/routing/rules/${rule.tag}`,
    'PUT',
    env,
    JSON.stringify(rule),
  )
}

export async function remove({ tag, zone }: Rule, env: Env): Promise<void> {
  await fetchAPI(`zones/${zone.id}/email/routing/rules/${tag}`, 'DELETE', env)
}
