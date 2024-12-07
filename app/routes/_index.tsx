import type { Route } from './+types/_index.js'

import { Suspense, useState } from 'react'
import { redirect } from 'react-router'
import { Await, Form, useLoaderData, useNavigation } from 'react-router'

import { createRule } from '~/models/rule.server'
import { getZones } from '~/models/zone.server'
import { getRoutingZones } from '~/models/routing.server'
import { getAddresses } from '~/models/address.server'
import { getSetting } from '~/models/settings.server'

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData()

  const rule = formData.get('rule')
  const zone = JSON.parse(formData.get('zone'))
  const address = formData.get('address')
  const expire = formData.get('expire')
  const remove = !!formData.get('remove')

  await createRule({ rule, zone, address, expire, remove }, context)

  return redirect('/manage')
}

export async function loader({ context }: Route.LoaderArgs) {
  return {
    routingZones: getRoutingZones(getZones(context), context),
    addresses: getAddresses(context),
    randomSize: getSetting('random-size', context),
  }
}

export default function Index() {
  const { routingZones, addresses, randomSize } = useLoaderData<typeof loader>()
  const today = new Date().toISOString().split('T')[0]
  const navigation = useNavigation()
  const isCreating = navigation.state === 'submitting'
  const [localPart, setLocalPart] = useState('')

  const generateLocalPart = async () => {
    const size = (await randomSize) || 1
    setLocalPart(self.crypto.randomUUID().split('-').slice(0, size).join('-'))
  }

  return (
    <Form method="post">
      <article style={{ margin: 0 }}>
        <label htmlFor="rule">
          Address ·{' '}
          <span
            onClick={generateLocalPart}
            data-tooltip="Generate a random address"
          >
            🔀
          </span>
        </label>
        <fieldset role="group">
          <input
            type="text"
            name="rule"
            placeholder="rule-local-part"
            aria-label="Address local-part"
            pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+"
            style={{
              textAlign: 'right',
            }}
            value={localPart}
            onChange={(e) => setLocalPart(e.target.value)}
            required
          />
          <button className="secondary" disabled>
            @
          </button>
          <Suspense
            fallback={
              <select
                id="zone"
                name="zone"
                aria-label="Address domain"
                defaultValue=""
                aria-busy="true"
                disabled
                required
              >
                <option value="">Loading zones…</option>
              </select>
            }
          >
            <Await
              resolve={routingZones}
              errorElement={
                <select
                  id="zone"
                  name="zone"
                  aria-label="Address domain"
                  defaultValue=""
                  aria-invalid="true"
                  required
                >
                  <option value="">Error loading zones</option>
                </select>
              }
            >
              {(routingZones: Zone[]) =>
                routingZones.length ? (
                  <select
                    id="zone"
                    name="zone"
                    aria-label="Address domain"
                    required
                  >
                    {routingZones.map((zone) => (
                      <option value={JSON.stringify(zone)} key={zone.id}>
                        {zone.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    id="zone"
                    name="zone"
                    aria-label="Address domain"
                    defaultValue=""
                    aria-invalid="true"
                    required
                  >
                    <option value="">
                      Unable to find a domain for email routing
                    </option>
                  </select>
                )
              }
            </Await>
          </Suspense>
        </fieldset>
        <label htmlFor="address">
          Forward to ·{' '}
          <a
            href="https://dash.cloudflare.com/?zone=email/routing/routes"
            data-tooltip="Add an routing address"
          >
            ➕
          </a>
          <Suspense
            fallback={
              <select
                id="address"
                name="address"
                defaultValue=""
                aria-busy="true"
                disabled
                required
              >
                <option value="">Loading routing addresses…</option>
              </select>
            }
          >
            <Await
              resolve={addresses}
              errorElement={
                <select
                  id="address"
                  name="address"
                  defaultValue=""
                  aria-invalid="true"
                  required
                >
                  <option value="" aria-invalid="true">
                    Error loading routing addresses
                  </option>
                </select>
              }
            >
              {(addresses: Address[]) => (
                <select id="address" name="address" required>
                  {addresses.map((address) => (
                    <option value={address.email} key={address.tag}>
                      {address.email}
                    </option>
                  ))}
                </select>
              )}
            </Await>
          </Suspense>
        </label>
        <label htmlFor="expire">
          Expiration
          <input type="date" id="expire" name="expire" min={today} required />
        </label>
        <label htmlFor="remove">
          <input type="checkbox" id="remove" name="remove" role="switch" />
          Delete 1 month after expiration
        </label>
        <footer>
          <button type="submit" aria-busy={isCreating} disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create a disposable address'}
          </button>
        </footer>
      </article>
    </Form>
  )
}
