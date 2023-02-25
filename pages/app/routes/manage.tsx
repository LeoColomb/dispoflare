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

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <section id="list">
      <Suspense fallback={<article aria-busy="true" />}>
        <Await
          resolve={data.rules}
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
            <article>
              <table role="grid">
                <thead>
                  <tr>
                    <th scope="col">Rule address</th>
                    <th scope="col">Status</th>
                    <th scope="col">Expire on</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <Rule rule={rule} />
                  ))}
                </tbody>
              </table>
            </article>
          )}
        </Await>
      </Suspense>
    </section>
  )
}
