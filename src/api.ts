export const onRequestGet = async ({ env }) => {
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

export const onRequestPost = async ({ env, request }) => {
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

export const onRequestDelete = async ({ env, request }) => {
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
