import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { merge } from 'ramda'

import { sortByDateTime } from 'Utils/Time'

const { Types, Creators } = createActions({
  messagesHistoryRequest: ['matchId'],
  messagesHistorySuccess: ['messagesHistory'],
  messagesHistoryFailure: ['problem'],
  messageSendRequest: ['params'],
  messageSendSuccess: ['result'],
  messageResendSuccess: ['messageId'],
  messageSendFailure: ['problem'],
  messageSendPlusRequest: ['params'],
  messageSendPlusSuccess: ['result'],
  messageSendPlusFailure: ['problem']
})

export const MessagesTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  history: null,
  chats: {},
  fetching: null,
  error: null,
  problem: null,
  sendError: null,
  sendProblem: null,
  sendResult: null,
  sending: null,
  sendPlus: {
    error: null,
    problem: null,
    sending: null
  }
})

export const historyRequest = (state, action) => {
  return state.merge({ fetching: true, error: null, problem: null })
}

export const historySuccess = (state, action) => {
  const history = action.messagesHistory.history.sort(sortByDateTime).sort((a, b) => b.id - a.id)
  const chat = {
    [action.messagesHistory.matchId]: history
  }
  const chats = merge(state.chats || {}, chat)
  return state.merge({ fetching: false, error: null, history: action.messagesHistory.history, chats })
}

export const historyFailure = (state, action) => {
  return state.merge({ fetching: false, error: true, problem: action.problem })
}

export const sendRequest = (state, action) => {
  return state.merge({ sending: true, sendError: null, sendProblem: null })
}

export const sendSuccess = (state, action) => {
  return state.merge({ sending: false, sendError: null, sendResult: action.result })
}

export const resendSuccess = (state, action) => {
  return state.merge({ messageId: action.messageId })
}

export const sendFailure = (state, action) => {
  return state.merge({ sending: false, sendError: true, sendProblem: action.problem })
}

export const sendPlusRequest = (state, action) => {
  return state.merge({ sendPlus: { sending: true, error: null, problem: null } })
}

export const sendPlusSuccess = (state, action) => {
  return state.merge({ sendPlus: { sending: false, error: false, problem: null } })
}

export const sendPlusFailure = (state, action) => {
  return state.merge({ sendPlus: { sending: false, error: true, problem: action.problem } })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MESSAGES_HISTORY_REQUEST]: historyRequest,
  [Types.MESSAGES_HISTORY_SUCCESS]: historySuccess,
  [Types.MESSAGES_HISTORY_FAILURE]: historyFailure,
  [Types.MESSAGE_SEND_REQUEST]: sendRequest,
  [Types.MESSAGE_SEND_SUCCESS]: sendSuccess,
  [Types.MESSAGE_RESEND_SUCCESS]: resendSuccess,
  [Types.MESSAGE_SEND_FAILURE]: sendFailure,
  [Types.MESSAGE_SEND_PLUS_REQUEST]: sendPlusRequest,
  [Types.MESSAGE_SEND_PLUS_SUCCESS]: sendPlusSuccess,
  [Types.MESSAGE_SEND_PLUS_FAILURE]: sendPlusFailure
})
