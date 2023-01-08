const API_ENDPOINT = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/email/routing/rules`

export async function onRequestGet() {
    return await fetch(API_ENDPOINT, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Key': API_KEY,
        },
    })
}

export async function onRequestPost({ request }) {
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

export async function onRequestDelete({ request }) {
    return await fetch(`${API_ENDPOINT}/${request.tag}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Key': API_KEY,
        },
    })
}
