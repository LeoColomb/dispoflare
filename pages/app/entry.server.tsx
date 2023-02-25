import type { EntryContext } from '@remix-run/cloudflare'
import { PassThrough } from 'stream'
import { renderToPipeableStream } from 'react-dom/server'
import { RemixServer } from '@remix-run/react'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          responseHeaders.set('Content-Type', 'text/html')
          const body = new PassThrough()
          resolve(
            new Response(body, {
              status: responseStatusCode,
              headers: responseHeaders,
            }),
          )
          pipe(body)
        },
        onShellError(err: unknown) {
          reject(err)
        },
      },
    )
  })
}
