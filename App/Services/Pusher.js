import Pusher from 'pusher-js/react-native'

export const pusherEvents = [
  'match-message',
  'match',
  'plus-message'
]

Pusher.log = (msg) => {
  // console.log('Pusher log:', msg)
}

export const pusherConstants = {
  appId: '468522',
  key: 'a2d291b0e2aa3a73e9ff',
  cluster: 'us2',
  secret: '79a32a69851b6daa3e1a',
  authEndpoint: 'https://111dreams.com/api/pusher/auth'
}

export const createPusher = (token) => {
  const { cluster, key, appId, secret, authEndpoint } = pusherConstants
  const pusher = new Pusher(key, {
    cluster,
    encrypted: false,
    secret,
    key: appId,
    authEndpoint,
    activityTimeout: 85000,
    auth: {
      headers: {
        'Token': token
      }
    }
  })
  return pusher
}
