import { Actions } from 'react-native-router-flux'
import { hasIn, range, flatten } from 'ramda'
import apiErrorHandler from './ApiErrorHandler'
import { notify } from './Notification'
import { isIphoneX, ifIphoneX } from './iPhoneX'

const isX = isIphoneX()

export const FEET_SIGN = '\''
export const INCH_SIGN = '"'

const array = (n) => Array(n).fill().map((e, i) => i + 1)

const rangeArray = (from, to) => array(to).filter(f => f >= from)

const getHeights = () => {
  const feets = range(4, 8)
  const inches = range(0, 12)
  const values = feets.map(feet => inches.map(inch => `${feet}${FEET_SIGN}${inch}${INCH_SIGN}`))
  return flatten(values)
}

const getFeets = inches => {
  const feets = Math.floor(inches / 12)
  const inchesRemain = inches - feets * 12

  return `${feets}.${inchesRemain}`
}

const getFeetsDisplay = inches => {
  const feets = Math.floor(inches / 12)
  const inchesRemain = inches - feets * 12
  return `${feets}'${inchesRemain}"`
}

const getFeetsDisplayByFloat = feets => {
  if (feets !== null) {
    const feetsArray = feets.split('.')
    const inch = Math.round(feetsArray[1] * 12 / 100)
    return `${feetsArray[0]}'${inch}"`
  } else return null
}

const getHeightByFeet = feets => {
  if (feets !== null) {
    const feetsArray = feets.replace(INCH_SIGN, '').split(FEET_SIGN)
    const fraction = Math.round(feetsArray[1] / 12 * 100)
    const height = `${feetsArray[0]}.${fraction}`
    return parseFloat(height)
  } else return 0
}

const capitalize = str => {
  if (str && str.length > 0) {
    return str[0].toUpperCase() + str.slice(1)
  } else {
    return ''
  }
}

const distance = (lat1, lon1, lat2, lon2, unit = 'K') => {
  let radlat1 = Math.PI * lat1 / 180
  let radlat2 = Math.PI * lat2 / 180
  let theta = lon1 - lon2
  let radtheta = Math.PI * theta / 180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit === 'K') { dist = dist * 1.609344 }
  if (unit === 'M') { dist = dist * 0.8684 }
  return dist
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const decodeUnicode = (s) => {
  return s.replace(/\\u([a-fA-F0-9]{4})/g, (matched, g1) => {
    return String.fromCharCode(parseInt(g1, 16))
  })
}

const encodeUnicode = (s) => {
  return s.replace(/[\s\S]/g, (matched, g) => {
    return '\\u' + ('0000' + g.charCodeAt().toString(16)).slice(-4)
  })
}

const decodeString = string => decodeUnicode(string)

const encodeString = string => encodeUnicode(string)

const validLetters = string => {
  return /^[A-Za-z\s]+$/.test(string)
}

const validEmail = string => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(string)
}

const randomKey = (keyLength = 36) => Math.random().toString(keyLength).substr(2, 5)

const dictTypes = {
  bodyTypes: 'type',
  occupations: 'occupation',
  religions: 'religion',
  ethnicities: 'ethnicity'
}

const getDictIds = (names, dictName, dicts) => {
  const dict = dicts[dictName]
  const findIds = name => dict.find(f => f[dictTypes[dictName]] === name).id
  const ids = names.map(findIds)
  return hasIn('asMutable', ids) ? ids.asMutable() : ids
}

const getDictIdsByGender = (names, dictName, dicts, gender) => {
  let namesList = hasIn('asMutable', names) ? names.asMutable() : names
  const dict = dicts[dictName]
  let items = []
  const filterItems = name => dict.filter(f => f[dictTypes[dictName]] === name).map(e => items.push(e))
  namesList.map(filterItems)
  if (gender) {
    items = items.filter(f => f.gender === gender)
  }
  const ids = items.map(e => e.id)
  return ids
}

const getDictNames = (ids, dictName, dicts) => {
  if (ids && ids.length > 0) {
    const dict = dicts[dictName]
    const findIds = id => dict.find(f => f.id === id)[dictTypes[dictName]]
    const names = ids.map(findIds)
    return hasIn('asMutable', names) ? names.asMutable() : names
  } else return []
}

const removeDuplicates = (arr, prop) => {
  return arr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

const arrayChunk = (array, length) => {
  for (var x, i = 0, c = -1, l = array.length, n = []; i < l; i++) {
    (x = i % length) ? n[c][x] = array[i] : n[++c] = [array[i]]
  }
  return n
}

const getInstagramPhotos = (photos) => {
  return photos.filter(f => f.source === 'instagram').map(el => ({
    full: el.path,
    thumb: el.thumbs
  }))
}

const hasInstagramAccess = (user) => {
  const photo = user.instagramPhotos[0].thumb
  return fetch(photo).then(response => (
      (response.status === 200) ? { id: user.id, name: user.name, privateInstagram: false } : { id: user.id, name: user.name, privateInstagram: true }
  ))
}

async function hasRemoteAccess (uri) {
  try {
    let response = await fetch(uri)
    let result = await response
    return result.ok
  } catch (error) {
    return false
  }
}

const getCurrentChatRoute = () => {
  const { routes } = Actions.state
  if (routes && routes[0] && routes[0].routes[0]) {
    const screen = routes[0].routes[0].find(f => f.key === 'chatScreen')
    const { userId, matchId } = screen
    return { userId, matchId }
  }
  return false
}

export {
  apiErrorHandler,
  random,
  distance,
  getHeights,
  rangeArray,
  array,
  decodeString,
  encodeString,
  validLetters,
  validEmail,
  randomKey,
  getDictIds,
  getDictNames,
  getDictIdsByGender,
  removeDuplicates,
  arrayChunk,
  notify,
  ifIphoneX,
  isIphoneX,
  isX,
  getFeets,
  getFeetsDisplay,
  getFeetsDisplayByFloat,
  getHeightByFeet,
  capitalize,
  getInstagramPhotos,
  hasRemoteAccess,
  hasInstagramAccess,
  getCurrentChatRoute
}
