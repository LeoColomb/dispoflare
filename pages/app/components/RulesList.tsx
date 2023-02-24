import { defer, LoaderArgs, SerializeFrom } from '@remix-run/cloudflare'
import { Await, useAsyncValue, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import { Rule } from '~/components/Rule'
import { getRules } from '~/models/rule.server'
import { getZones } from '~/models/zone.server'

export const loader = async ({ context }: LoaderArgs) => {
  const zones = await getZones(context)
  const rules = getRules(zones, context)

  return defer({
    rules,
  })
}

export const RulesList = () => {
  const data = useLoaderData<typeof loader>()

  return (
    <Suspense fallback={<article aria-busy="true" />}>
      <Await
        resolve={data.rules}
        errorElement={<p>Error loading rules list</p>}
      >
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
            <RulesListTable />
          </tbody>
        </table>
      </Await>
    </Suspense>
  )
}

function RulesListTable() {
  const rules: Rule[] = useAsyncValue<SerializeFrom<typeof loader>['rules']>()

  return (
    <tbody>
      {rules.map((rule) => (
        <Rule rule={rule} />
      ))}
    </tbody>
  )
}
