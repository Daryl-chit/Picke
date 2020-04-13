import { call, put, select } from 'redux-saga/effects'

import MatchedUsersActions from 'Redux/MatchedUsersRedux'
import LikeActions from 'Redux/LikeRedux'

import { getToken, getTokenType } from 'Utils/Auth'

import { MATCHED_USERS_STEP } from 'Config/Constants'

const getOffset = state => state.matchedUsers.offset

export function * matchedUsersRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  const prevOffset = yield select(getOffset)
  const offset = action.offset === 0 ? 0 : prevOffset + MATCHED_USERS_STEP
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.getMatchedUsers, { offset })
  if (response.ok) {
    const { data } = response
    const matchedUsers = data.data
    yield put(MatchedUsersActions.matchedUsersSuccess(matchedUsers, offset))
  } else {
    yield put(MatchedUsersActions.matchedUsersFailure(response.problem))
  }
}
