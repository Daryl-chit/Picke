import { all, call, put } from 'redux-saga/effects'
import { getToken, getTokenType } from 'Utils/Auth'

import DialogsActions from 'Redux/DialogsRedux'
import { MESSAGE_SEND_ATTEMPTS } from 'Config/Constants'
import MatchedUsersActions from 'Redux/MatchedUsersRedux'
import MessagesActions from 'Redux/MessagesRedux'
import { apiErrorHandler } from 'Tools'
import { notify } from 'Tools/Notifications'

export function * messagesHistoryRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { matchId } = action
  const response = yield call(api.getMessagesHistory, { matchId })
  if (response.ok) {
    const { data } = response
    const messagesHistory = {
      history: data.data,
      matchId: action.matchId
    }
    yield put(MessagesActions.messagesHistorySuccess(messagesHistory))
    const actions = [
      yield put(DialogsActions.totalsRequest())
    ]
    all(actions)
  } else {
    apiErrorHandler(response, 'Can\'t get message history')
    yield put(MessagesActions.messagesHistoryFailure(response.problem))
  }
}

export function * messageSendRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)

  const { messageId, matchId, message, imgFile } = action.params

  if (!message && !imgFile) {
    return
  }

  const params = { matchId, imgFile, message }
  const response = yield call(api.postNewMatchMessage, params)

  api.setHeader('content-type', 'application/json')
  if (response.ok) {
    const { data } = response
    yield put(MessagesActions.messageSendSuccess(data.data))
    yield put(MessagesActions.messageResendSuccess(messageId))
    yield put(MessagesActions.messagesHistoryRequest(params.matchId))
    const actions = [
      yield put(DialogsActions.totalsRequest())
    ]
    all(actions)
  } else {
    apiErrorHandler(response, 'Send message failed')
    yield put(MessagesActions.messageSendFailure({
      problem: response.problem,
      messageId: messageId
    }))
  }
}

export function * messageSendPlusRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { messageId, userId, message, imgFile, name } = action.params

  const params = {
    userId,
    imgFile,
    message
  }
  const response = yield call(api.postNewPlusMessage, params)
  api.setHeader('content-type', 'application/json')
  if (response.ok) {
    const { data } = response
    notify({ title: 'Message successfully sent to ' + name })
    yield put(MessagesActions.messageSendPlusSuccess(data.data))
    const actions = [
      yield put(DialogsActions.totalsRequest())
    ]
    all(actions)
  } else {
    apiErrorHandler(response, 'Send message failed')
    yield put(MessagesActions.messageSendPlusFailure({ problem: response.problem, messageId: messageId }))
  }
}
