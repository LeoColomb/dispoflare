import type { LoaderArgs } from '@remix-run/cloudflare'
import { Suspense } from 'react'
import { defer } from '@remix-run/cloudflare'
import { Await, useLoaderData } from '@remix-run/react'

import { getSetting } from '~/models/settings.server'

const defaultSettings: Settings = [
  {
    key: 'deletion-delay',
    name: 'Deletion delay',
    value: '2',
  },
  {
    key: 'Dddd',
    name: 'Ddsd sd',
    value: 'our',
  },
]

export const loader = async ({ context }: LoaderArgs) => {
  const settings: any = {}
  for (const setting of defaultSettings) {
    settings[setting.key] = getSetting(setting.key, context)
  }
  return defer(settings)
}

export default function Settings() {
  const data = useLoaderData<typeof loader>()

  return (
    <section id="list">
      <article>
        {defaultSettings.map((setting) => (
          <label htmlFor={setting.key} key={setting.key}>
            {setting.name}

            <Suspense
              fallback={
                <input
                  type="text"
                  id={setting.key}
                  name={setting.key}
                  aria-busy="true"
                />
              }
            >
              <Await
                resolve={data[setting.key]}
                errorElement={
                  <input
                    type="text"
                    id={setting.key}
                    name={setting.key}
                    aria-invalid="true"
                  />
                }
              >
                {(settingValue) => (
                  <input
                    type="text"
                    id={setting.key}
                    name={setting.key}
                    value={settingValue ?? setting.value}
                  />
                )}
              </Await>
            </Suspense>
          </label>
        ))}
      </article>
    </section>
  )
}
