import { AppLoadContext } from '@remix-run/cloudflare'
import * as addresses from 'sdk/addresses'

export async function getAddresses(
  context: AppLoadContext,
): Promise<Array<Address>> {
  return addresses.list(context)
}
