/* global fetch */

const RESOLVEABLE_URLS = {
  collection: RegExp('https://tictail.com/collections/([^/?]+)(\\?.*)?'),
  category: RegExp('https://tictail.com/categories/([^/?]+)(\\?.*)?'),
  brand: RegExp('https://tictail.com/s/([^/?]+)(\\?.*)?'),
  product: RegExp('https://tictail.com/s/([^/]+)/([^/?]+)(\\?.*)?')
}
export function getType (url) {
  for (const type in RESOLVEABLE_URLS) {
    const regex = RESOLVEABLE_URLS[type]
    if (regex.test(url)) return type
  }
  return null
}

export function getEndpoint (url) {
  const type = getType(url)
  const regex = RESOLVEABLE_URLS[type]

  const match = url.match(regex)

  if (!match) return null

  if (type === 'collection') {
    return `https://api.tictail.com/v1.12/collections/${match[1]}`
  } else if (type === 'product') {
    return `https://api.tictail.com/v1.12/stores/` +
      `d_${match[1]}.tictail.com/products?slug=${match[2]}`
  } else if (type === 'brand') {
    return `https://api.tictail.com/v1.12/stores/` +
      `d_${match[1]}.tictail.com`
  } else if (type === 'category') {
    return `https://api.tictail.com/v1.12/categories/s_${match[1]}`
  }

  return null
}

export function resolve (url) {
  const endpoint = getEndpoint(url)
  const type = getType(url)
  if (!endpoint) return Promise.reject(`unable to resolve url: ${url}`)

  return fetch(endpoint)
    .then(v => v.json())
    .then(response => {
      const {id} = response
      const result = {id, type, url}

      if (type === 'collection') {
        Object.assign(result, {
          slug: response.slug,
          title: response.name
        })
      } else if (type === 'product') {
        Object.assign(result, {
          store_id: response.store_id,
          title: `${response.store_name} - ${response.title}`
        })
      } else if (type === 'brand') {
        Object.assign(result, {
          title: response.name
        })
      } else if (type === 'category') {
        Object.assign(result, {
          slug: response.slug,
          title: response.name
        })
      }

      return result
    })
}
