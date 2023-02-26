interface Env {
  // Bindings to KV.
  // https://developers.cloudflare.com/workers/runtime-apis/kv/
  KV_SETTINGS: KVNamespace

  // Bindings to Durable Object.
  // https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace

  // Bindings to R2.
  // https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket

  // Bindings to Variables.
  // https://developers.cloudflare.com/workers/platform/environment-variables/
  CLOUDFLARE_API_TOKEN: string
  CLOUDFLARE_ACCOUNT_ID: string
  SENTRY_DSN: string
}
