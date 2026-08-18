import type { Route } from './+types/_index.js'
import * as routing from 'sdk/routing.js'
import { getCloudflareEnv } from '~/lib/cloudflare.js'

export async function getRoutingZones(
  zones: Zone[] | Promise<Zone[]>,
  context: Route.LoaderArgs,
): Promise<Array<Zone>> {
  const allZones = await zones
  const env = getCloudflareEnv(context)
  const routingZones: Array<PromiseSettledResult<Routing>> =
    await Promise.allSettled(
      allZones.map((zone: Zone) => routing.get(zone, env)),
    )
  return routingZones
    .filter((zone) => zone.status === 'fulfilled' && zone.value.enabled)
    .map((rZone) => allZones.find((aZone) => aZone.name === rZone.value.name))
}
