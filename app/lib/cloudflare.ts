import { createContext } from 'react-router'

export type CloudflareContextValue = {
  env: Env
  context: ExecutionContext
}

export const cloudflareContext =
  createContext<CloudflareContextValue>('Cloudflare context not available')

export function getCloudflareEnv(
  context: { get: <T>(ctx: unknown) => T },
): Env {
  return context.get(cloudflareContext).env
}
