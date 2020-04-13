import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

const { Types, Creators } = createActions({
  peopleRequest: ['params'],
  peopleSuccess: ['list'],
  peopleFailure: ['problem'],
  instagramSuccess: ['instagrams'],
  cleanRequest: []
})

export const PeopleTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  problem: null,
  instagrams: {},
  list: [],
  done: false
})

export const request = (state) => {
  return state.merge({ fetching: true, error: null, problem: null, done: false })
}

export const success = (state, action) => {
  const { list } = action
  return state.merge({ fetching: false, error: null, list })
}

export const instagramSuccess = (state, action) => {
  const { instagrams } = action
  return state.merge({ instagrams: { ...state.instagrams, ...instagrams } })
}

export const failure = (state, problem) => {
  return state.merge({ fetching: false, error: true, problem })
}

export const clean = (state) => {
  return state.merge({ fetching: true, error: false, list: [] })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PEOPLE_REQUEST]: request,
  [Types.PEOPLE_SUCCESS]: success,
  [Types.PEOPLE_FAILURE]: failure,
  [Types.INSTAGRAM_SUCCESS]: instagramSuccess,
  [Types.CLEAN_REQUEST]: clean
})
