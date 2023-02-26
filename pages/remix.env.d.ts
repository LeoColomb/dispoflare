/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

type Settings = Setting[]

type Setting = {
  key: string
  name: string
  value: any
  metadata?: Metadata
}

type Metadata = {
  [key: string]: string
}
