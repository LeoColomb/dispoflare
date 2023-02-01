// https://developers.cloudflare.com/workers/

import { fetch } from './workers/fetch'
import { scheduled } from './workers/scheduled'
import { email } from './workers/email'

export default {
  fetch,
  scheduled,
  email,
} as ExportedHandler<Env>
