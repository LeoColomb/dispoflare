import { AppLoadContext } from 'react-router'
import * as addresses from 'sdk/addresses.js'

export async function getAddresses(
  context: AppLoadContext,
): Promise<Array<Address>> {
  return addresses.list(context.cloudflare.env)
}
