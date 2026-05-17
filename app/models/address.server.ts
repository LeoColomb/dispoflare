import type { Route } from './+types/_index.js'
import * as addresses from 'sdk/addresses.js'

export async function getAddresses(
  context: Route.LoaderArgs,
): Promise<Array<Address>> {
  return addresses.list(context.cloudflare.env)
}
