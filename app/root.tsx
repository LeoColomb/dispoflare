import type { MetaFunction, LinksFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  useCatch,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@picocss/pico@latest/css/pico.min.css',
    },
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Dispoflare · Disposable email addresses on the fly',
  description: 'Disposable email addresses on the fly',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div className="error-container">
      <h1>
        {caught.status} {caught.statusText}
      </h1>
    </div>
  )
}
