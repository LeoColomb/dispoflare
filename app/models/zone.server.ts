import type { Route } from './+types/_index.js'
import * as zones from 'sdk/zones.js'

export async function getZones(
  context: Route.LoaderArgs,
): Promise<Array<Zone>> {
  return zones.list(context.cloudflare.env)
}
