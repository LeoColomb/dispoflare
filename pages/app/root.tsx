import type { LinksFunction } from '@remix-run/cloudflare'
import type { V2_MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { Footer } from '~/components/Footer'
import { Nav } from '~/components/Nav'

import styles from '@picocss/pico'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: V2_MetaFunction = () => [
  { charset: 'utf-8' },
  { title: 'Dispoflare · Disposable email addresses on the fly' },
  {
    name: 'description',
    content: 'Disposable email addresses on the fly',
  },
  {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1',
  },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Nav />
        <main className="container" role="document">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <html>
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Nav />
          <main className="container" role="document">
            <hgroup style={{ textAlign: 'center' }}>
              <h1>{error.status}</h1>
              <h2>{error.statusText}</h2>
            </hgroup>
            <article style={{ textAlign: 'center' }}>
              {error.data.message}
            </article>
          </main>
          <Footer />
          <Scripts />
        </body>
      </html>
    )
  }

  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Nav />
        <main className="container" role="document">
          <hgroup style={{ textAlign: 'center' }}>
            <h1>Oh no!</h1>
            <h2>Something went wrong</h2>
          </hgroup>
          <article style={{ textAlign: 'center' }}>{error.toString()}</article>
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
