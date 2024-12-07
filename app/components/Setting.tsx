import { ChangeEvent, Suspense, useState } from 'react'
import { Await, useFetcher } from 'react-router'

export const Setting = ({
  setting,
  valuePromise,
}: {
  setting: Setting
  valuePromise: Promise<string | null>
}) => {
  const [value, setValue] = useState(setting.value)
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
        <Suspense
          fallback={
            <input
              type="range"
              id={setting.key}
              name="setting-value"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={value}
              aria-busy="true"
            />
          }
        >
          <Await
            resolve={valuePromise}
            errorElement={
              <input
                type="range"
                id={setting.key}
                name="setting-value"
                min={setting.min}
                max={setting.max}
                step={setting.step}
                value={value}
                aria-invalid="true"
                disabled
              />
            }
          >
            {(valueResolved) => {
              setValue(valueResolved || setting.value)
              return (
                <input
                  type="range"
                  id={setting.key}
                  name="setting-value"
                  onChange={onChange}
                  min={setting.min}
                  max={setting.max}
                  step={setting.step}
                  value={value}
                />
              )
            }}
          </Await>
        </Suspense>
      </label>
    </fetcher.Form>
  )
}
