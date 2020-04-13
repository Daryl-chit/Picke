import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getInstagramMediaRequest: ['username'],
  getInstagramMediaSuccess: ['photos', 'subscribersCount'],
  getInstagramMediaFailure: ['problem'],
  getInstagramMediaArrayRequest: ['instagramUsers'],
  getInstagramMediaArraySuccess: ['users']
})

export const InstagramTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  error: false,
  problem: null,
  photos: [],
  username: null,
  subscribersCount: null,
  users: []
})

const getInstagramMediaRequest = (store, action) => {
  const { username } = action
  return store.merge({
    loading: true,
    error: false,
    problem: null,
    subscribersCount: null,
    photos: [],
    username
  })
}

const getInstagramMediaArrayRequest = (store, action) => {
  return store.merge({
    loading: true,
    error: false,
    problem: null,
    subscribersCount: null,
    photos: [],
    users: []
  })
}

const getInstagramMediaArraySuccess = (store, action) => {
  const { users } = action
  return store.merge({
    loading: false,
    error: false,
    problem: null,
    subscribersCount: null,
    photos: [],
    users
  })
}


const getInstagramMediaSuccess = (store, action) => {
  const { photos, subscribersCount } = action
  return store.merge({
    loading: false,
    error: false,
    problem: null,
    subscribersCount,
    photos
  })
}

const getInstagramMediaFailure = (store, action) => {
  return store.merge({
    loading: false,
    error: true,
    problem: action.problem,
    subscribersCount: null,
    photos: [],
    users: []
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_INSTAGRAM_MEDIA_REQUEST]: getInstagramMediaRequest,
  [Types.GET_INSTAGRAM_MEDIA_SUCCESS]: getInstagramMediaSuccess,
  [Types.GET_INSTAGRAM_MEDIA_FAILURE]: getInstagramMediaFailure,
  [Types.GET_INSTAGRAM_MEDIA_ARRAY_REQUEST]: getInstagramMediaArrayRequest,
  [Types.GET_INSTAGRAM_MEDIA_ARRAY_SUCCESS]: getInstagramMediaArraySuccess
})
