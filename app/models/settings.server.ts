import { AppLoadContext } from 'react-router';

export async function getSetting(
  key: string,
  context: AppLoadContext,
): Promise<string | null> {
  return context.cloudflare.env.KV_SETTINGS?.get(key) || null
}

export async function putSetting(
  key: string,
  value: string,
  context: AppLoadContext,
): Promise<void> {
  return context.cloudflare.env.KV_SETTINGS.put(key, value)
}
