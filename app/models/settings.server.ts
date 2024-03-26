export async function getSetting(
  key: string,
  env: Env,
): Promise<string | null> {
  return env.KV_SETTINGS?.get(key) || null
}

export async function putSetting(
  key: string,
  value: string,
  env: Env,
): Promise<void> {
  return env.KV_SETTINGS.put(key, value)
}
