export async function fetchAPI<T>(
  path: string,
  method: string = 'GET',
  env: Env,
  body: string | undefined = undefined,
) {
  const api: API<T> = await (
    await fetch(`https://api.cloudflare.com/client/v4/${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      },
      body,
    })
  ).json()

  // Discard erroneous answers
  if (api.success !== true) {
    throw new Error(JSON.stringify(api.errors))
  }

  return api.result
}
