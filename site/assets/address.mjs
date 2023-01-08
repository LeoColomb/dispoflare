
const init = async () => {
    const response = await fetch('/address')
    const list = document.getElementById('list')

    list.replaceChildren();

    (await response.json()).result.forEach(element => {
        const name = element.matchers.shift().value

        if (name) {
            const h4 = document.createElement('h4')
            h4.appendChild(document.createTextNode(name))

            const article = document.createElement('article')
            article.appendChild(h4)

            list.appendChild(article)
        }
    })
}

init()

// addEventListener('delete_address', () => {
//     return null
// })
