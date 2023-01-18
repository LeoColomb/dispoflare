const init = async () => {
  const response = await fetch('/address')
  const list = document.getElementById('list')

  list.replaceChildren()

  ;(await response.json()).result.forEach((element) => {
    const address = element.matchers.shift().value
    let metadata
    try {
      metadata = JSON.parse(element.name)
    } catch {
      metadata = null
    }

    if (address) {
      const h4 = document.createElement('h4')
      h4.appendChild(document.createTextNode(address))
      const time = document.createElement('time')
      time.appendChild(document.createTextNode(metadata?.expire))

      const article = document.createElement('article')
      article.append(h4, time)

      list.appendChild(article)
    }
  })
}

init()

// addEventListener('delete_address', () => {
//     return null
// })
