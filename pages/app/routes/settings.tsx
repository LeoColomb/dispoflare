import type { LoaderArgs, ActionArgs } from '@remix-run/cloudflare'
import { defer } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getSetting, putSetting } from '~/models/settings.server'
import { Setting } from '~/components/Setting'

const defaultSettings: Settings = [
  {
    key: 'random-size',
    name: 'Random address generator size (1-4)',
    value: 1,
    min: 1,
    max: 4,
  },
  {
    key: 'deletion-delay',
    name: 'Deletion delay (days)',
    value: 7,
    min: 1,
    max: 60,
  },
]

export const loader = async ({ context }: LoaderArgs) => {
  const settings: any = {}
  for (const setting of defaultSettings) {
    settings[setting.key] = getSetting(setting.key, context)
  }
  return defer(settings)
}

export const action = async ({ request, context }: ActionArgs) => {
  const formData = await request.formData()
  return putSetting(
    formData.get('setting-key'),
    formData.get('setting-value'),
    context,
  )
}

export default function Settings() {
  const data = useLoaderData<typeof loader>()

  return (
    <article style={{ margin: 0 }}>
      <header>
        <strong>Settings</strong>
      </header>
      {defaultSettings.map((setting) => (
        <Setting
          key={setting.key}
          setting={setting}
          valuePromise={data[setting.key]}
        />
      ))}
      <footer>⚠️ Page work in progress. Setting may not be saved.</footer>
    </article>
  )
}
