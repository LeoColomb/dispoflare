export const onRequestGet = async ({ env }) => {
    return fetch(`https://api.cloudflare.com/client/v4/zones/${env.ZONE_ID}/email/routing/rules`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.API_KEY}`,
        },
    })
}

export const onRequestPost = async ({ env, request }) => {
    const data = (await request.formData())

    const result = await fetch(`https://api.cloudflare.com/client/v4/zones/${env.ZONE_ID}/email/routing/rules`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.API_KEY}`,
        },
        body: JSON.stringify({
            actions: [
                {
                    type: 'forward',
                    value: [
                        env.DEST_ADDR,
                    ],
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
                expire: data.get('date')
            })
        })
    })

    if ((await result.json()).success) {
        return Response.redirect('/', 301)
    }

    return result
}

export const onRequestDelete = async ({ env, request }) => {
    return fetch(`https://api.cloudflare.com/client/v4/zones/${env.ZONE_ID}/email/routing/rules/${request.tag}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.API_KEY}`,
        },
    })
}
