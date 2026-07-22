import type { Route } from './+types/_index.js'
import * as addresses from 'sdk/addresses.js'
import { getCloudflareEnv } from '~/lib/cloudflare.js'

export async function getAddresses(
  context: Route.LoaderArgs,
): Promise<Array<Address>> {
  return addresses.list(getCloudflareEnv(context))
}
