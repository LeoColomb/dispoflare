/// <reference types="vite/client" />
/// <reference types="@react-router/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

type Settings = Setting[]

interface Setting {
  key: string
  name: string
  value: number | string
  min?: number
  max?: number
  step?: number
  metadata?: Metadata
}

interface Metadata {
  [key: string]: string
}
