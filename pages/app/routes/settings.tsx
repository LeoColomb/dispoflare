import type { LoaderArgs, ActionArgs } from '@remix-run/cloudflare'
import { defer } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getSetting, putSetting } from '~/models/settings.server'
import { Setting } from '~/components/Setting'

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
    </article>
  )
}
