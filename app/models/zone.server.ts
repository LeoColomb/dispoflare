import { AppLoadContext } from '@remix-run/cloudflare'
import * as zones from 'sdk/zones'

export async function getZones(context: AppLoadContext): Promise<Array<Zone>> {
  return zones.list(context.cloudflare.env)
}
