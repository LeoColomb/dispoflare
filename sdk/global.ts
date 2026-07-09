export async function fetchAPI<T>(
  path: string,
  method: string = 'GET',
  env: Env,
  body: string | undefined = undefined,
) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
    },
    body,
  })
  const api: API<T> = await response.json()

  // Discard erroneous answers
  if (api.success !== true) {
    throw new Error(
      `${method} ${path} failed with ${response.status}: ${JSON.stringify(api.errors)}`,
    )
  }

  return api.result
}
