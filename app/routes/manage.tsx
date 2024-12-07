import type { Route } from './+types/manage.js'

import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router'

import { getRules } from '~/models/rule.server.js'
import { getZones } from '~/models/zone.server.js'

import { Rule } from '~/components/Rule.js'

export async function loader({ context }: Route.LoaderArgs) {
  return {
    rules: getRules(getZones(context), context),
  }
}

export default function Manage() {
  const { rules } = useLoaderData<typeof loader>()

  return (
    <article style={{ margin: 0 }}>
      <header>
        <strong>Manage</strong>
      </header>
      <Suspense fallback={<div aria-busy="true" />}>
        <Await
          resolve={rules}
          errorElement={
            <article
              style={{
                '--border-color': 'var(--form-element-invalid-border-color)',
                border: 'var(--border-width) solid var(--border-color)',
                backgroundImage: 'var(--icon-invalid)',
                backgroundPosition: 'top 0.75rem center',
                backgroundSize: '1rem auto',
                backgroundRepeat: 'no-repeat',
                textAlign: 'center',
              }}
            >
              <p>
                Unable to load the rules
                <br />
                <small>Try reloading the page.</small>
              </p>
            </article>
          }
        >
          {(rules: Rule[]) => (
            <div className="">
              {rules.map((rule) => (
                <Rule rule={rule} key={rule.tag} />
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </article>
  )
}
