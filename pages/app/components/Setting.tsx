import type { LoaderArgs, ActionArgs } from '@remix-run/cloudflare'
import { Suspense } from 'react'
import { defer } from '@remix-run/cloudflare'
import { Await, useFetcher, useLoaderData } from '@remix-run/react'

export const Setting = ({
  setting,
  valuePromise,
}: {
  setting: Setting
  valuePromise: Promise<string | null>
}) => {
  const fetcher = useFetcher()
  const isBusy = fetcher.state === 'submitting'

  return (
    <fetcher.Form
      className="grid"
      style={{
        alignItems: 'baseline',
      }}
      method="post"
    >
      <label htmlFor={setting.key} key={setting.key}>
        {setting.name}
      </label>
      <Suspense
        fallback={
          <input
            type="text"
            id={setting.key}
            name="setting-value"
            aria-busy="true"
          />
        }
      >
        <Await
          resolve={valuePromise}
          errorElement={
            <input
              type="text"
              id={setting.key}
              name="setting-value"
              aria-invalid="true"
            />
          }
        >
          {(value) => (
            <input
              type="text"
              id={setting.key}
              name="setting-value"
              value={value ?? setting.value}
            />
          )}
        </Await>
      </Suspense>
      <button
        type="submit"
        aria-label="Save"
        name="setting-key"
        value={setting.key}
        disabled={isBusy}
        aria-busy={isBusy}
      >
        💾
      </button>
    </fetcher.Form>
  )
}
