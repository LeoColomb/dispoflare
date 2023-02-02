import type { ActionArgs, LoaderArgs } from '@remix-run/cloudflare'
import { json, redirect } from '@remix-run/cloudflare'
import { Form, useLoaderData, useNavigation } from '@remix-run/react'

import { createRule, getRules } from '~/models/rule.server'
import { getZones } from '~/models/zone.server'
import { getAddresses } from '~/models/address.server'
import { Footer } from '~/components/Footer'
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
  const navigation = useNavigation()
  const isCreating = navigation.state === 'submitting'

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
                aria-busy={isCreating}
                disabled={isCreating}
              >
                {isCreating ? 'Creating...' : 'Create a disposable address'}
              </button>
            </Form>
          </article>
        </section>
        <section id="list">
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
        <Footer />
      </main>
    </div>
  )
}
