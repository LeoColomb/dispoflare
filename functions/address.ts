const API_ENDPOINT = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/email/routing/rules`

export const onRequestGet: PagesFunction<Env> = async () => {
    return await fetch(API_ENDPOINT, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Key': API_KEY,
        },
    })
}

export const onRequestPost: PagesFunction<Env> = async ({ request }) => {
    const address = (await request.formData()).get('address')

    return await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Key': API_KEY,
        },
        body: JSON.stringify({
            actions: [
                {
                    type: 'forward',
                    value: [
                        DEST_ADDR,
                    ],
                },
            ],
            enabled: true,
            matchers: [
                {
                    field: 'to',
                    type: 'literal',
                    value: `${address}@${ZONE_DOMAIN}`,
                },
            ],
        })
    })
}

export const onRequestDelete: PagesFunction<Env> = async ({ request }) => {
    return await fetch(`${API_ENDPOINT}/${request.tag}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Key': API_KEY,
        },
    })
}
