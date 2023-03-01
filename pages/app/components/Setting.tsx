import { ChangeEvent, Suspense, useState } from 'react'
import { Await, useFetcher } from '@remix-run/react'

export const Setting = ({
  setting,
  valuePromise,
}: {
  setting: Setting
  valuePromise: Promise<string | null>
}) => {
  const [value, setValue] = useState('')
  const fetcher = useFetcher()
  const isBusy = fetcher.state === 'submitting'

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

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
              disabled
            />
          }
        >
          {(valueResolved) => {
            setValue(valueResolved)
            return (
              <input
                type="text"
                id={setting.key}
                name="setting-value"
                onChange={onChange}
                value={value}
              />
            )
          }}
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
