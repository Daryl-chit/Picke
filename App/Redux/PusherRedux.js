import { createActions, createReducer } from 'reduxsauce'

import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  createPusher: ['token', 'userId'],
  createPusherSuccess: ['pusher'],
  createPusherFailure: ['problem']
})

export const PusherTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  // pusher: null,
  ready: null,
  error: null,
  problem: null
})

export const createPusher = (state) =>
  state.merge({ ready: false, error: null, problem: null })

export const success = (state, action) => {
  return state.merge({ ready: true, error: null })
}
export const failure = (state, problem) =>
  state.merge({ ready: false, error: true, problem })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_PUSHER]: createPusher,
  [Types.CREATE_PUSHER_SUCCESS]: success,
  [Types.CREATE_PUSHER_FAILURE]: failure
})
