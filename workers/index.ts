// https://developers.cloudflare.com/workers/

// import { fetch } from './fetch'
import { scheduled } from './scheduled'
import { email } from './email'

export default {
  // fetch,
  scheduled,
  email,
} as ExportedHandler<Env>
