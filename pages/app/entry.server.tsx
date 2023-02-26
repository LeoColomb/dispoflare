import type { EntryContext } from '@remix-run/cloudflare'
import { renderToReadableStream } from 'react-dom/server'
import { RemixServer } from '@remix-run/react'

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      onError() {
        responseStatusCode = 500
      },
    },
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(body, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
