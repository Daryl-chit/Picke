import apisauce from 'apisauce'

// import { randomKey } from 'Tools'

const create = (baseURL = 'https://apinsta.herokuapp.com/u/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  // const setHeader = (name, value) => api.setHeader(name, value)

  // const getUser = ({ userId, instagramToken, count }) => {
  //   const uri = `users/${userId}/?access_token=${instagramToken}`
  //   const params = {
  //     ACCESS_TOKEN: instagramToken,
  //     COUNT: count || 40
  //   }
  //   // console.log('Instagram getUser', { uri, params })
  //   return api.get(uri, params)
  // }

  // const getMedia = ({ userId, instagramToken, count }) => {
  //   const uri = `users/${userId}/media/recent/?access_token=${instagramToken}`
  //   const params = {
  //     ACCESS_TOKEN: instagramToken,
  //     COUNT: count || 40
  //   }
  //   // console.log('Instagram getMedia', { uri, params })
  //   return api.get(uri, params)
  // }

  // const getSelf = ({ instagramToken }) => {
  //   const uri = `users/self/?access_token=${instagramToken}`
  //   const params = {
  //     ACCESS_TOKEN: instagramToken
  //   }
  //   // console.log('Instagram getSelf', { uri, params })
  //   return api.post(uri, params)
  // }

  // const getSelfMedia = ({ instagramToken }) => {
  //   const uri = `users/self/media/recent/?access_token=${instagramToken}`
  //   const params = {
  //     ACCESS_TOKEN: instagramToken
  //   }
  //   // console.log('Instagram getSelfMedia', { uri, params })
  //   return api.get(uri, params)
  // }

  const getInstagramMedia = ({ username }) => api.get(`${username}`)

  return {
    getInstagramMedia
    // getUser,
    // getMedia,
    // setHeader,
    // getSelf,
    // getSelfMedia
  }
}

export default {
  create
}
