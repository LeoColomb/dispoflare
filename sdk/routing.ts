import { fetchAPI } from './global'

export async function get(zone: Zone, env: Env): Promise<Routing> {
  return fetchAPI(`zones/${zone.id}/email/routing`, 'GET', env)
}
