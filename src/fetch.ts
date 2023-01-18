import {
  getAssetFromKV,
  NotFoundError,
  MethodNotAllowedError,
} from '@cloudflare/kv-asset-handler'
import { deleteRule, getRules, postRule } from './api'
// import { Env } from './bindings'

import manifestJSON from '__STATIC_CONTENT_MANIFEST'
const assetManifest = JSON.parse(manifestJSON)

export const fetch = async (
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> => {
  if (request.url.endsWith('/addresses')) {
    switch (request.method) {
      case 'GET':
        return getRules(env)
      case 'POST':
        return postRule(request, env)
      case 'DELETE':
        return deleteRule(request, env)
      default:
        return new Response('Method not allowed', { status: 405 })
    }
  }
  try {
    return await getAssetFromKV(
      {
        request,
        waitUntil(promise) {
          return ctx.waitUntil(promise)
        },
      },
      {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
      },
    )
  } catch (e) {
    if (e instanceof NotFoundError) {
      return new Response('Not found', { status: 404 })
    } else if (e instanceof MethodNotAllowedError) {
      return new Response('Method not allowed', { status: 405 })
    } else {
      return new Response('An unexpected error occurred', { status: 500 })
    }
  }
}
