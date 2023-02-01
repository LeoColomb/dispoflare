import type { ActionArgs, LoaderArgs } from '@remix-run/cloudflare'
import { json, redirect } from '@remix-run/cloudflare'
import {
  Form,
  useLoaderData,
  useActionData,
  useTransition,
} from '@remix-run/react'

import { getRules, createRule } from '~/models/rule.server'
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
  const { zones, addresses, rules } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const transition = useTransition()
  const isCreating = Boolean(transition.submission)

  return (
    <div>
      <main className="container">
        <section id="add">
          <article>
            {/* <h2>Add a new address</h2> */}
            <Form method="post">
              <div className="grid">
                <label htmlFor="rule">
                  Rule
                  <input
                    type="text"
                    name="rule"
                    placeholder="rule-local-part"
                    aria-label="Email address"
                    required
                  />
                </label>
                <label htmlFor="zone">
                  @
                  <select
                    id="zone"
                    name="zone"
                    placeholder="example.com"
                    required
                  >
                    {zones.map((zone) => (
                      <option value={JSON.stringify(zone)}>{zone.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label htmlFor="address">
                Forward to
                <select
                  id="address"
                  name="address"
                  placeholder="user@example.com"
                  required
                >
                  {addresses.map((address) => (
                    <option value={address.email}>{address.email}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="expire">
                Expiration
                <input type="date" id="expire" name="expire" required />
              </label>
              <button
                type="submit"
                disabled={isCreating}
                name="_actions"
                value="create"
              >
                {isCreating ? 'Creating...' : 'Create a disposable address'}
              </button>
            </Form>
          </article>
        </section>
        <hr />
        <section id="list">
          {/* <h2>Addresses list</h2> */}
          {rules.map((rule) => (
            <Rule rule={rule} />
          ))}
        </section>
      </main>
    </div>
  )
}
