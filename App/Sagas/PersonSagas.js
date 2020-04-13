import { call, put } from 'redux-saga/effects'

import { getToken, getTokenType } from 'Utils/Auth'
import { hasInstagramAccess, getInstagramPhotos } from 'Tools'
import PersonActions from 'Redux/PersonRedux'
import LikeActions from 'Redux/LikeRedux'
import DialogsActions from 'Redux/DialogsRedux'
import MatchedUsersActions from 'Redux/MatchedUsersRedux'

export function * personRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.getUserData, { userId: action.personId })
  if (response.ok) {
    const { data } = response
    let user = data.data
    if (user.instagram_user) {
      const instagramPhotos = getInstagramPhotos(user.photos)
      user = {...user, ...{ instagramPhotos }}
      if (instagramPhotos.length > 0) {
        const privateInstagram = yield call(hasInstagramAccess, user)
        user = {...user, ...{ privateInstagram: privateInstagram.privateInstagram }}
      }
    }
    yield put(PersonActions.personSuccess(user))
  } else {
    yield put(PersonActions.personFailure(response.problem))
  }
}

export function * unmatchRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { user_id } = action
  const response = yield call(api.unmatch, { user_id })
  if (response.ok) {
    const { data } = response
    const matchDeleted = data.data.match_deleted
    if (matchDeleted === 1) {
      yield put(MatchedUsersActions.matchedUsersRequest())
    }
    yield put(PersonActions.unmatchSuccess(data.data))
  } else {
    yield put(PersonActions.unmatchFailure(response.problem))
  }
}

export function * reportRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { user_id, text } = action
  const response = yield call(api.report, { user_id, text: text })
  if (response.ok) {
    const { data } = response
    yield put(PersonActions.reportSuccess(data.data))
  } else {
    yield put(PersonActions.reportFailure(response.problem))
  }
}

export function * blockRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { user_id } = action
  const response = yield call(api.block, { user_id })
  if (response.ok) {
    const { data } = response
    const matchDeleted = data.data.match_deleted
    if (matchDeleted === 1) {
      yield put(MatchedUsersActions.matchedUsersRequest())
    }
    yield put(PersonActions.blockSuccess(data.data))
  } else {
    yield put(PersonActions.blockFailure(response.problem))
  }
}
