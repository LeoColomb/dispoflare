import type { Route } from './+types/_index.js'
import * as zones from 'sdk/zones.js'
import { getCloudflareEnv } from '~/lib/cloudflare.js'

export async function getZones(
  context: Route.LoaderArgs,
): Promise<Array<Zone>> {
  return zones.list(getCloudflareEnv(context))
}
