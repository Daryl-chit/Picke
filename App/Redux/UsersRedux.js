import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  activeUsersRequest: null,
  activeUsersSuccess: ['activeUsers'],
  activeUsersFailure: ['problem'],

  newUsersRequest: null,
  newUsersSuccess: ['newUsers'],
  newUsersFailure: ['problem'],

  filterUsersRequest: null,
  filterUsersSuccess: ['filterUsers'],
  filterUsersFailure: ['problem']
})

export const UsersTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  activeUsers: {
    list: [],
    fetching: false,
    error: null,
    problem: null
  },
  newUsers: {
    list: [],
    fetching: false,
    error: null,
    problem: null
  },
  filterUsers: {
    list: [],
    fetching: false,
    error: null,
    problem: null
  }
})

export const activeRequest = (state) => {
  return state.merge({ activeUsers: {fetching: true, error: null, problem: null, list: []} })
}
export const activeSuccess = (state, action) => {
  return state.merge({ activeUsers: {fetching: false, error: null, list: action.activeUsers} })
}
export const activeFailure = (state, problem) => {
  return state.merge({ activeUsers: {fetching: false, error: true, problem} })
}

export const newRequest = (state) => {
  return state.merge({ newUsers: {fetching: true, error: null, problem: null, list: []} })
}
export const newSuccess = (state, action) => {
  return state.merge({ newUsers: {fetching: false, error: null, list: action.newUsers} })
}
export const newFailure = (state, problem) => {
  return state.merge({ newUsers: {fetching: false, error: true, problem} })
}

export const filterRequest = (state) => {
  return state.merge({ filterUsers: {fetching: true, error: null, problem: null, list: []} })
}
export const filterSuccess = (state, action) => {
  return state.merge({ filterUsers: {fetching: false, error: null, list: action.filterUsers} })
}
export const filterFailure = (state, problem) => {
  return state.merge({ filterUsers: {fetching: false, error: true, problem} })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTIVE_USERS_REQUEST]: activeRequest,
  [Types.ACTIVE_USERS_SUCCESS]: activeSuccess,
  [Types.ACTIVE_USERS_FAILURE]: activeFailure,

  [Types.NEW_USERS_REQUEST]: newRequest,
  [Types.NEW_USERS_SUCCESS]: newSuccess,
  [Types.NEW_USERS_FAILURE]: newFailure,

  [Types.FILTER_USERS_REQUEST]: filterRequest,
  [Types.FILTER_USERS_SUCCESS]: filterSuccess,
  [Types.FILTER_USERS_FAILURE]: filterFailure
})
