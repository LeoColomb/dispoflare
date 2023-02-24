import type { ActionArgs, LoaderArgs } from '@remix-run/cloudflare'
import { json, redirect } from '@remix-run/cloudflare'
import { NavLink, useLoaderData, useNavigation } from '@remix-run/react'

import { createRule, getRules } from '~/models/rule.server'
import { getZones } from '~/models/zone.server'
import { getAddresses } from '~/models/address.server'
import { Rule } from '~/components/Rule'

export const action = async ({ request, context }: ActionArgs) => {
  const formData = await request.formData()

  const rule = formData.get('rule')
  const zone = JSON.parse(formData.get('zone'))
  const address = formData.get('address')
  const expire = formData.get('expire')

  await createRule({ rule, zone, address, expire }, context)

  return redirect('/')
}

export const loader = async ({ context }: LoaderArgs) => {
  const zones = await getZones(context)

  return json({
    zones,
    addresses: await getAddresses(context),
    rules: await getRules(zones, context),
  })
}

export default function Index() {
  const { rules } = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  const isCreating = navigation.state === 'submitting'

  return (
    <section id="list">
      <NavLink to="/" role="button" end>
        ➕ Create a new disposable address
      </NavLink>
      <hr />
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
    </section>
  )
}
