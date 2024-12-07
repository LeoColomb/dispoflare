import type { MetaFunction } from 'react-router';

import {
  Links,
  Meta,
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import '@picocss/pico'

import { Footer } from '~/components/Footer'
import { Nav } from '~/components/Nav'

export const meta: MetaFunction = () => [
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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Nav />
        <main className="container" role="document">
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
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
