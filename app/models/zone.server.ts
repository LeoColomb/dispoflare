import { AppLoadContext } from 'react-router'
import * as zones from 'sdk/zones.js'

export async function getZones(context: AppLoadContext): Promise<Array<Zone>> {
  return zones.list(context.cloudflare.env)
}
