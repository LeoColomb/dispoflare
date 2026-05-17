import type { Route } from './+types/_index.js'
export async function getSetting(
  key: string,
  context: Route.LoaderArgs,
): Promise<string | null> {
  return context.cloudflare.env.KV_SETTINGS?.get(key) || null
}

export async function putSetting(
  key: string,
  value: string,
  context: Route.LoaderArgs,
): Promise<void> {
  return context.cloudflare.env.KV_SETTINGS.put(key, value)
}
