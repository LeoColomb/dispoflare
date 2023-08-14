import type { LoaderArgs } from '@remix-run/cloudflare'
import { Suspense } from 'react'
import { defer } from '@remix-run/cloudflare'
import { Await, useLoaderData } from '@remix-run/react'

import { getRules } from '~/models/rule.server'
import { getZones } from '~/models/zone.server'
import { Rule } from '~/components/Rule'

export const loader = async ({ context }: LoaderArgs) => {
  return defer({
    rules: getRules(getZones(context), context),
  })
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
