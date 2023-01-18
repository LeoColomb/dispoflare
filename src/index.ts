// https://developers.cloudflare.com/workers/

import { fetch } from './fetch'
import { scheduled } from './scheduled'

export default {
  fetch,
  scheduled,
}
