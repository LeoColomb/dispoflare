import type { ActionArgs, LoaderArgs } from '@remix-run/cloudflare'
import { Suspense } from 'react'
import { redirect, defer } from '@remix-run/cloudflare'
import { Await, Form, useLoaderData, useNavigation } from '@remix-run/react'

import { createRule } from '~/models/rule.server'
import { getZones } from '~/models/zone.server'
import { getAddresses } from '~/models/address.server'

export const action = async ({ request, context }: ActionArgs) => {
  const formData = await request.formData()

  const rule = formData.get('rule')
  const zone = JSON.parse(formData.get('zone'))
  const address = formData.get('address')
  const expire = formData.get('expire')
  const remove = !!formData.get('remove')

  await createRule({ rule, zone, address, expire, remove }, context)

  return redirect('/')
}

export const loader = async ({ context }: LoaderArgs) => {
  return defer({
    zones: getZones(context),
    addresses: getAddresses(context),
  })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  const isCreating = navigation.state === 'submitting'

  return (
    <Form method="post">
      <article style={{ margin: 0 }}>
        <div className="grid">
          <label htmlFor="rule">
            Address
            <input
              type="text"
              name="rule"
              placeholder="rule-local-part"
              aria-label="Address local-part"
              pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+"
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
                resolve={data.zones}
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
                {(zones: Zone[]) => (
                  <select
                    id="zone"
                    name="zone"
                    aria-label="Address domain"
                    required
                  >
                    {zones.map((zone) => (
                      <option value={JSON.stringify(zone)}>{zone.name}</option>
                    ))}
                  </select>
                )}
              </Await>
            </Suspense>
          </label>
        </div>
        <label htmlFor="address">
          Forward to
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
              resolve={data.addresses}
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
                    <option value={address.email}>{address.email}</option>
                  ))}
                </select>
              )}
            </Await>
          </Suspense>
        </label>
        <label htmlFor="expire">
          Expiration
          <input type="date" id="expire" name="expire" required />
        </label>
        <label htmlFor="remove">
          <input type="checkbox" id="remove" name="switch" role="switch" />
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
