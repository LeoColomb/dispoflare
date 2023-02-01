import { fetchAPI } from 'sdk/global'

export async function list(env: Env): Promise<Array<Address>> {
  return fetchAPI(
    `accounts/${env.ACCOUNT_ID}/email/routing/addresses`,
    'GET',
    env,
  )
}
