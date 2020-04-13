import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  setUser: ['payload'],
  setUserFailure: ['problem'],
  setUserLocal: ['payload'],
  userRequest: [],
  userSuccess: ['user'],
  addPhotoRequest: ['photo'],
  addPhotoSuccess: ['payload'],
  addPhotoFailure: ['problem'],
  getUserRequest: ['userId'],
  getUserFailure: [],
  deletePhotoRequest: ['id'],
  deletePhotoSuccess: ['id'],
  deletePhotoFailure: ['problem'],
  syncInstagramRequest: ['instagramToken'],
  syncInstagramSuccess: ['instagramToken'],
  syncInstagramFailure: ['problem'],
  getInstagramMediaSuccess: ['instagramMedia'],
  cleanInstagramRequest: [],
  logout: [],
  deleteRequest: ['reason'],
  deleteSuccess: ['deleteData'],
  deleteFailure: ['problem'],
  hideRequest: [],
  hideSuccess: ['hiddenData'],
  hideFailure: ['problem'],
  showRequest: [],
  showSuccess: ['showData'],
  showFailure: ['problem'],
  subscriptionRequest: ['receipt'],
  setLocation: ['params']
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  name: null,
  gender: null,
  age: null,
  dob: null,
  height: null,
  occupations: [],
  educations: [],
  about: null,
  zodiac: null,
  religion: null,
  ethnicities: [],
  bodyTypes: [],
  is_hidden: null,
  photos: [],
  photo: null,
  instagram_user: null,
  instagram_avatar: null,
  interests: [],
  friends: [],
  location: {
    lon: null,
    lat: null
  },
  zipcode: null,
  fb_id: null,
  distance: null,
  userInfo: {
    godUser: null,
    isHidden: null,
    plusMember: null,
    userId: null
  },
  userId: null,
  setUserError: false,
  photoUpload: {
    loading: false,
    error: false,
    loaded: false,
    problem: null
  },
  deletePhoto: {
    deleting: false,
    error: false,
    deleted: false,
    problem: null
  },
  syncInstagram: {
    token: null,
    success: false,
    loading: false,
    error: false,
    problem: null
  },
  instagramMedia: [],
  fetchingUser: false,
  getUserFailure: false,
  token: null,
  deleteData: {
    loading: false,
    deleted: false,
    error: false,
    problem: null
  },
  hiddenData: {
    loading: false,
    hidden: false,
    error: false,
    problem: null
  },
  showData: {
    loading: false,
    show: false,
    error: false,
    problem: null
  }
})

const setUser = (store, action) => {
  return store.merge({
    setUserError: false
  })
}

const setUserError = (store, action) => {
  return store.merge({
    setUserError: true
  })
}

const logout = (store, action) => store.merge(INITIAL_STATE)

const addPhoto = (store, action) => {
  return store.merge({
    photoUpload: { loading: true, error: false, loaded: false }
  })
}

const addPhotoSuccess = (store, { payload }) => {
  return store.merge({
    photos: [{ ...payload, num: payload.num + 1 }, ...store.photos],
    photoUpload: { loading: false, error: false, loaded: true }
  })
}

const addPhotoFailure = (store, action) => {
  return store.merge({
    photoUpload: { loading: false, error: false, loaded: false }
  })
}

const getInstagramMediaSuccess = (store, action) => {
  const { instagramMedia } = action
  return store.merge({ instagramMedia })
}

const cleanInstagram = (store, action) => {
  return store.merge({
    instagram_user: null,
    instagram_avatar: null,
    instagramMedia: [],
    syncInstagram: {
      loading: false,
      error: false,
      success: false,
      token: null
    }
  })
}

const syncInstagram = (store, action) => {
  return store.merge({
    syncInstagram: {
      loading: true,
      error: false,
      success: false,
      token: action.instagramToken
    }
  })
}

const syncInstagramSuccess = (store, action) => {
  const { instagramToken } = action
  return store.merge({
    syncInstagram: {
      loading: false,
      error: false,
      success: true,
      token: instagramToken
    }
  })
}

const syncInstagramFailure = (store, action) => {
  return store.merge({
    syncInstagram: {
      loading: false,
      error: true,
      problem: action.problem,
      loaded: false,
      token: null
    }
  })
}

const deletePhoto = (store, action) => {
  return store.merge({
    deletePhoto: { deleting: true, error: false, deleted: false }
  })
}

const deletePhotoSuccess = (store, action) => {
  const { id } = action
  const photos = store.photos.asMutable().filter(f => f.id !== id)
  return store.merge({
    photos,
    deletePhoto: { deleting: false, error: false, deleted: true }
  })
}

const deletePhotoFailure = (store, action) => {
  const { problem } = action
  return store.merge({
    deletePhoto: { deleting: false, error: false, problem, deleted: false }
  })
}

const setUserLocal = (store, action) => {
  return store.merge({ ...action.payload })
}

const getUserRequest = (store, action) => {
  return store.merge({ fetchingUser: true })
}

const userSuccess = (store, action) => {
  return store.merge({
    ...action.user,
    fetchingUser: false
  })
}

const getUserFailure = (store, action) => {
  return store.merge({
    getUserFailure: true,
    fetchingUser: false
  })
}

const hideRequest = (store, action) => {
  return store.merge({ hiddenData: { loading: true, error: false } })
}

const hideSuccess = (store, action) => {
  return store.merge({
    hiddenData: { loading: false, error: false, hidden: true }
  })
}

const hideFailure = (store, action) => {
  const { problem } = action
  return store.merge({
    hiddenData: { loading: false, error: true, problem, hidden: false }
  })
}

const deleteRequest = (store, action) => {
  return store.merge({ deleteData: { loading: true, error: false } })
}

const deleteSuccess = (store, action) => {
  return store.merge({
    deleteData: { loading: false, error: false, deleted: true }
  })
}

const deleteFailure = (store, action) => {
  const { problem } = action
  return store.merge({
    deleteData: { loading: false, error: true, problem, deleted: true }
  })
}

const showRequest = (store, action) => {
  return store.merge({ showData: { loading: true, error: false, show: false } })
}

const showSuccess = (store, action) => {
  return store.merge({ showData: { loading: false, error: false, show: true }})
}

const showFailure = (store, action) => {
  const { problem } = action
  return store.merge({ showData: { loading: false, error: true, problem, show: false }})
}

const subscriptionRequest = (store, action) => {
  return store
}

const setLocation = (store, action) => {
  return store
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER]: setUser,
  [Types.SET_USER_FAILURE]: setUserError,
  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_FAILURE]: getUserFailure,
  [Types.SET_USER_LOCAL]: setUserLocal,
  [Types.USER_SUCCESS]: userSuccess,
  [Types.ADD_PHOTO_REQUEST]: addPhoto,
  [Types.ADD_PHOTO_SUCCESS]: addPhotoSuccess,
  [Types.ADD_PHOTO_FAILURE]: addPhotoFailure,
  [Types.SYNC_INSTAGRAM_REQUEST]: syncInstagram,
  [Types.SYNC_INSTAGRAM_FAILURE]: syncInstagramFailure,
  [Types.SYNC_INSTAGRAM_SUCCESS]: syncInstagramSuccess,
  [Types.DELETE_PHOTO_REQUEST]: deletePhoto,
  [Types.DELETE_PHOTO_SUCCESS]: deletePhotoSuccess,
  [Types.DELETE_PHOTO_FAILURE]: deletePhotoFailure,
  [Types.GET_INSTAGRAM_MEDIA_SUCCESS]: getInstagramMediaSuccess,
  [Types.CLEAN_INSTAGRAM_REQUEST]: cleanInstagram,
  [Types.LOGOUT]: logout,
  [Types.HIDE_REQUEST]: hideRequest,
  [Types.HIDE_SUCCESS]: hideSuccess,
  [Types.HIDE_FAILURE]: hideFailure,
  [Types.DELETE_REQUEST]: deleteRequest,
  [Types.DELETE_SUCCESS]: deleteSuccess,
  [Types.DELETE_FAILURE]: deleteFailure,
  [Types.SHOW_REQUEST]: showRequest,
  [Types.SHOW_SUCCESS]: showSuccess,
  [Types.SHOW_FAILURE]: showFailure,
  [Types.SUBSCRIPTION_REQUEST]: subscriptionRequest,
  [Types.SET_LOCATION]: setLocation
})
