import { fetchAPI } from 'sdk/global'

export async function list(env: Env): Promise<Array<Zone>> {
  return fetchAPI('zones', 'GET', env)
}
