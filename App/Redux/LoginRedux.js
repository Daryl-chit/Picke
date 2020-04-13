import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  loginRequest: ['token', 'tokenType'],
  smsLoginRequest: ['code'],
  loginSuccess: ['login'],
  loginFailure: ['problem'],
  logoutRequest: [],
  logoutSuccess: null,
  logoutFailure: ['problem'],
  fetchStartup: []
})

export const LoginTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  avatar: null,
  fetching: null,
  update_required: false,
  error: null,
  problem: null,
  logoutError: null
})

export const request = (state, action) => {
  return state.merge({ fetching: true, logoutError: null, error: null, update_required: false, problem: null })
}
export const success = (state, action) => {
  return state.merge({ fetching: false, error: null, update_required: action.login.update_required? true : false })
}

export const failure = (state, problem) => state.merge({ fetching: false, error: true, problem })

export const smsLoginRequest = (state, action) => {
  return state.merge({ fetching: true, logoutError: null, error: null, update_required: false, problem: null })
}

export const logoutRequest = (state, action) => {
  return state.merge({ logoutError: null })
}

export const logoutSuccess = (state, action) => {
  return state.merge({ fetching: false, logoutError: false })
}

export const logoutFailure = (state, problem) => {
  return state.merge({ fetching: false, logoutError: problem })
}

export const fetchStartup = (state, problem) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.SMS_LOGIN_REQUEST]: smsLoginRequest,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: logoutFailure,
  [Types.FETCH_STARTUP]: fetchStartup
})
