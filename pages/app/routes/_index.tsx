import type { ActionArgs, LoaderArgs } from '@remix-run/cloudflare'
import { Suspense, useState } from 'react'
import { redirect, defer } from '@remix-run/cloudflare'
import { Await, Form, useLoaderData, useNavigation } from '@remix-run/react'

import { createRule } from '~/models/rule.server'
import { getZones } from '~/models/zone.server'
import { getRoutingZones } from '~/models/routing.server'
import { getAddresses } from '~/models/address.server'

export const action = async ({ request, context }: ActionArgs) => {
  const formData = await request.formData()

  const rule = formData.get('rule')
  const zone = JSON.parse(formData.get('zone'))
  const address = formData.get('address')
  const expire = formData.get('expire')
  const remove = !!formData.get('remove')

  await createRule({ rule, zone, address, expire, remove }, context)

  return redirect('/manage')
}

export const loader = async ({ context }: LoaderArgs) => {
  return defer({
    routingZones: getRoutingZones(getZones(context), context),
    addresses: getAddresses(context),
  })
}

export default function Index() {
  const { routingZones, addresses } = useLoaderData<typeof loader>()
  const today = new Date().toISOString().split('T')[0]
  const navigation = useNavigation()
  const isCreating = navigation.state === 'submitting'
  const [localPart, setLocalPart] = useState('')

  const generateLocalPart = () => {
    setLocalPart(self.crypto.randomUUID())
  }

  return (
    <Form method="post">
      <article style={{ margin: 0 }}>
        <div className="grid">
          <label htmlFor="rule">
            Address ·{' '}
            <span
              onClick={generateLocalPart}
              data-tooltip="Generate a random address"
            >
              🔀
            </span>
            <input
              type="text"
              name="rule"
              placeholder="rule-local-part"
              aria-label="Address local-part"
              pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+"
              value={localPart}
              onChange={(e) => setLocalPart(e.target.value)}
              required
            />
          </label>
          <label htmlFor="zone">
            @
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
                {(routingZones: Zone[]) => (
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
                )}
              </Await>
            </Suspense>
          </label>
        </div>
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
