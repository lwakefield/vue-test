const RESOLVEABLE_URLS = {
  collection: RegExp('https://tictail.com/collections/([^/?]+)(\\?.*)?'),
  category: RegExp('https://tictail.com/categories/([^/?]+)(\\?.*)?'),
  brand: RegExp('https://tictail.com/s/([^/?]+)(\\?.*)?'),
  product: RegExp('https://tictail.com/s/([^/]+)/([^/?]+)(\\?.*)?')
}

export class Resolveables {
  static function getType (url) {
    for (const type of RESOLVEABLE_URLS) {
      const regex = RESOLVEABLE_URLS[type]
      if (regex.test(url)) return type
    }
    return null
  }
  static function getEndpoint (url) {
    const type = Resolveables.getType(url)
    const regex = RESOLVEABLE_URLS[type]

    const match = regex.match(url)

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
  static function resolve (url) {
    const endpoint = Resolveables.getEndpoint(url)
    if (!endpoint) Promise.reject(`unable to result url: ${url}`)

    return fetch(endpoint).then(v => v.json())
  }
}

export default class Api {
}
