/// <reference types="vite/client" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

type Settings = Setting[]

type Setting = {
  key: string
  name: string
  value: number | string
  min?: number
  max?: number
  step?: number
  metadata?: Metadata
}

type Metadata = {
  [key: string]: string
}
