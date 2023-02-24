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
import { Footer } from '~/components/Footer'
import { Nav } from '~/components/Nav'

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

export function ErrorBoundary({ error }) {
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh no! · Dispoflare</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Nav />
        <main className="container" role="document">
          {JSON.stringify(error)}
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <html>
      <head>
        <title>Oh no! · Dispoflare</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Nav />
        <main className="container" role="document">
          <hgroup style={{ textAlign: 'center' }}>
            <h1>{caught.status}</h1>
            <h2>{caught.statusText}</h2>
          </hgroup>
          <article style={{ textAlign: 'center' }}>{caught.data}</article>
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
