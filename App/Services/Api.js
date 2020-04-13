import apisauce from 'apisauce'

import { randomKey } from 'Tools'

const create = (baseURL = 'https://111dreams.com/api/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 60000
  })

  const setHeader = (name, value) => api.setHeader(name, value)
  const deleteHeader = (name) => api.deleteHeader(name)
  const setToken = (token) => {
    return api.setHeader('Token', token)
  }
  const setTokenType = (type) => {
    return api.setHeader('token-type', type)
  }

  const auth = (params) => api.post('auth', params)

  const logout = () => api.post('logout')

  const getReligions = () => api.get('dict/religions')
  const getBodyTypes = () => api.get('dict/bodyTypes')
  const getOccupations = () => api.get('dict/occupations')
  const getEthnicities = () => api.get('dict/ethnicities')
  const getVenues = (params) => api.get('venues/getVenues', params)
  const getActiveUsers = (params) => api.get('users/getActiveUsers', params)
  const getNewUsers = (params) => api.get('users/getNewUsers', params)
  const getMyFilters = (params) => api.get('users/getMyFilters', params)
  const getUserData = (params) => api.get('user/getData', params)
  const getVenue = (venueId) => api.get('venues/getVenue', { venue_id: venueId })

  const search = (params) => api.get('search', params)

  const like = (params) => {
    const { user_id } = params
    return api.post('match/like', { user_id })
  }

  const dislike = (params) => {
    const { user_id } = params
    return api.post('match/dislike', { user_id })
  }

  const getTotalUsersWhoLiked = () => api.get('match/getTotalUsersWhoLiked')
  const getUsersWhoLiked = ({ lastLikeId }) => api.get('match/getUsersWhoLiked', { last_like_id: lastLikeId })
  const getMatchedUsers = (params) => api.get('im/getMatchedUsers', params)
  const getDialogs = (params) => api.get('im/getDialogs', params)
  const getMessagesHistory = ({ matchId }) => api.get(`im/${matchId}`)
  const getMessagesTotals = () => api.get('im/getTotals')
  const getMessage = ({ messageId }) => api.get('im/getMessageById', { message_id: messageId })

  const editUser = (params) => api.post('user/edit', params)

  const unmatch = (params) => api.post('match/unmatch', params)
  const report = (params) => api.post('report', params)
  const block = (params) => api.post('user/block', params)

  const addPhoto = ({
    photo
  }) => {
    api.setHeader('content-type', 'multipart/form-data')
    const form = new FormData()
    form.append('photo', {
      name: `${randomKey()}.jpeg`,
      uri: photo,
      type: 'image/jpeg'
    })
    form.append('is_avatar', 1)
    return api.post('user/addPhoto', form)
  }

  const postNewMatchMessage = ({
    matchId,
    imgFile,
    message
  }) => {
    api.setHeader('content-type', 'multipart/form-data')
    const form = new FormData()
    if (imgFile) {
      form.append('img_file', {
        name: `${randomKey()}.jpeg`,
        uri: imgFile,
        type: 'image/jpeg'
      })
    }
    form.append('message', message)
    form.append('match_id', matchId)
    // console.log('Send Message Api:', form)
    return api.post('im/postNewMatchMessage', form)
  }

  const postNewPlusMessage = ({
    userId,
    imgFile,
    message
  }) => {
    api.setHeader('content-type', 'multipart/form-data')
    const form = new FormData()
    if (imgFile) {
      form.append('img_file', {
        name: `${randomKey()}.jpeg`,
        uri: imgFile,
        type: 'image/jpeg'
      })
    }
    form.append('message', message)
    form.append('user_id', userId)
    // console.log('postNewPlusMessage Api:', { form, userId, imgFile, message })
    return api.post('im/postNewPlusMessage', form)
  }

  const searchMessages = ({ limit, offset, searchString, type }) => api.post('im/searchMessages', {
    limit, offset, type, search_string: searchString
  })

  const hideProfile = () => api.post('user/hide')
  const showProfile = () => api.post('user/show')
  const setLocation = ({ lat, lon }) => api.post('user/setLocation', { lat, lon })
  const removeAccount = ({ reason }) => api.post('user/delete', { reason: reason })
  const getPhotos = () => api.get('user/getPhotos')
  const removePhoto = ({ id, userId }) => api.post('user/deletePhoto', { id, userId })
  const syncInstagram = ({ instagramToken }) => api.post('user/syncInstagram', { instagram_token: instagramToken })
  const cleanInstagram = () => api.post('user/cleanInstagram')
  const markAsRead = ({ matchId }) => api.post('im/markRead', { match_id: matchId })
  const validatePlus = ({ receipt }) => api.post('subscription/enablePickePlusSubscription', { receipt, device: 'IOS' })
  const subscriptionLog = ({ userID, data }) => api.post('subscription/log', { user_id: userID, data })

  return {
    setHeader,
    deleteHeader,
    setToken,
    setTokenType,
    getUserData,
    auth,
    logout,
    getReligions,
    getBodyTypes,
    getOccupations,
    getEthnicities,
    getVenues,
    getActiveUsers,
    getNewUsers,
    getMyFilters,
    getVenue,
    search,
    like,
    dislike,
    getTotalUsersWhoLiked,
    getUsersWhoLiked,
    getMatchedUsers,
    getDialogs,
    getMessagesHistory,
    getMessagesTotals,
    getMessage,
    postNewMatchMessage,
    postNewPlusMessage,
    searchMessages,
    editUser,
    addPhoto,
    hideProfile,
    showProfile,
    setLocation,
    removeAccount,
    getPhotos,
    removePhoto,
    syncInstagram,
    cleanInstagram,
    markAsRead,
    unmatch,
    report,
    block,
    validatePlus,
    subscriptionLog
  }
}

export default {
  create
}
