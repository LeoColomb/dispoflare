export const getRules = async (env: Env): Promise<Response> => {
  return fetch(
    `https://api.cloudflare.com/client/v4/zones/${env.ZONE_ID}/email/routing/rules`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.API_KEY}`,
      },
    },
  )
}

export const postRule = async (
  request: Request,
  env: Env,
): Promise<Response> => {
  const data = await request.formData()

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${env.ZONE_ID}/email/routing/rules`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.API_KEY}`,
      },
      body: JSON.stringify({
        actions: [
          {
            type: 'forward',
            value: [env.DEST_ADDR],
          },
        ],
        enabled: true,
        matchers: [
          {
            field: 'to',
            type: 'literal',
            value: `${data.get('address')}@${env.ZONE_DOMAIN}`,
          },
        ],
        name: JSON.stringify({
          expire: data.get('date'),
        }),
      }),
    },
  )

  const result = await response.json()
  if (result.success) {
    return Response.redirect('/', 301)
  }
  return Response.redirect(
    `/?error=${result.messages[0].code}&message=${encodeURI(
      result.messages[0].message,
    )}`,
    301,
  )
}

export const putRule = async (
  request: Request,
  env: Env,
): Promise<Response> => {
  return fetch(
    `https://api.cloudflare.com/client/v4/zones/${env.ZONE_ID}/email/routing/rules/${request.tag}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.API_KEY}`,
      },
    },
  )
}

export const deleteRule = async (
  request: Request,
  env: Env,
): Promise<Response> => {
  return fetch(
    `https://api.cloudflare.com/client/v4/zones/${env.ZONE_ID}/email/routing/rules/${request.tag}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.API_KEY}`,
      },
    },
  )
}
