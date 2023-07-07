import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
})

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop', page: 1, perPage: 30, orientation: 'landscape'
  })
  const unsplashResults = photos.response.results
  return unsplashResults.map(result => result.urls['small'])
}

const fetchCoffeeStores = async (latLong = '43.651438901058036%2C-79.38296888532005', limit = 6) => {
  const photos = await getListOfCoffeeStorePhotos()
  const options = {
    method: 'GET', headers: {
      accept: 'application/json', Authorization: process.env.NEXT_PUBLIC_PLACES_API_KEY
    }
  }

  const query = 'coffee'

  const res = await fetch(getUrlForCoffeeStores(latLong, query, limit), options)
  const data = await res.json()
  return data.results.map((result, i) => {
    return {
      ...result,
      id: result.fsq_id,
      address: result.location.formatted_address,
      locality: result.location.cross_street,
      imgUrl: photos[i]
    }
  })
}

const getUrlForCoffeeStores = (latLong, query, limit = 6) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

export { fetchCoffeeStores }