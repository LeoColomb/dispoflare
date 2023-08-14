type API<T> = {
  errors: any[]
  messages: string[]
  result: T
  success: boolean
  result_info: any
}

type Zone = {
  id: string
  name: string
}

type Routing = {
  enabled: boolean
  name: string
  status: string
  tag: string
}

type Address = {
  email: string
  tag: string
}

type Rule = {
  actions: {
    type: 'drop' | 'forward' | 'worker'
    value: string[]
  }[]
  enabled: boolean
  matchers: {
    field: string
    type: string
    value: string
  }[]
  name: string
  tag: string
  zone: Zone
  data: DispoflareData
}

type DispoflareData = {
  dispoflare: true
  activate: Date | string
  expire: Date | string
  remove: Date | string | undefined
  deprecate: Date | string | undefined
  forwardTo: string | undefined
}
