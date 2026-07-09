import type { Route } from './+types/_index.js'
import { getCloudflareEnv } from '~/lib/cloudflare.js'
export async function getSetting(
  key: string,
  context: Route.LoaderArgs,
): Promise<string | null> {
  return getCloudflareEnv(context).KV_SETTINGS?.get(key) || null
}

export async function putSetting(
  key: string,
  value: string,
  context: Route.LoaderArgs,
): Promise<void> {
  return getCloudflareEnv(context).KV_SETTINGS.put(key, value)
}
