import { call, put, select, all } from 'redux-saga/effects'
import { getToken, getTokenType } from 'Utils/Auth'

import LikeActions from 'Redux/LikeRedux'
import DialogsActions from 'Redux/DialogsRedux'
import MatchedUsersActions from 'Redux/MatchedUsersRedux'
import NotificationActions from 'Redux/NotificationRedux'

const getLikes = state => state.likes.usersWhoLiked

export function * like (api, { userId }) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.like, { user_id: userId })
  if (response.ok && response.data && response.data.data) {
    const { data } = response
    yield put(LikeActions.likeSuccess(data.data, userId))
    const isMatch = data.data.accepted === '1'
    if (isMatch) {
      const match = response.data.data
      const matchId = match.match_id
      const userNname = `${match.user.name} ${match.user.last_name}`
      yield put(NotificationActions.alertWithType({
        type: 'match',
        title: userNname,
        image: match.user.avatar,
        userId: match.user.id,
        matchId: matchId,
        createAt: match.updated_at
      }))
      const actions = [
        yield put(LikeActions.likedRequest())
      ]
      yield all(actions)
    }
  } else {
    yield put(LikeActions.likeFailure(response.problem))
  }
}

export function * dislike (api, { userId }) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.dislike, { user_id: userId })
  if (response.ok && response.data && response.data.data) {
    const { data } = response
    yield put(LikeActions.dislikeSuccess(data.data, userId))
    yield put(LikeActions.likedRequest())
  } else {
    yield put(LikeActions.likeFailure(response.problem))
  }
}

export function * getUsersWhoLiked (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const likes = yield select(getLikes)
  const lastLikeId = likes && likes.length > 0 ? likes[likes.length - 1].like_id : null
  const response = yield call(api.getUsersWhoLiked, { lastLikeId: lastLikeId })
  if (response.ok) {
    const { data } = response
    yield put(LikeActions.likedSuccess(data.data))
    yield put(LikeActions.totalRequest())
  } else {
    yield put(LikeActions.likedFailure(response.problem))
  }
}

export function * getTotalUsersWhoLiked (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.getTotalUsersWhoLiked)
  if (response.ok) {
    const { data } = response
    yield put(LikeActions.totalSuccess(data.data.total))
  } else {
    yield put(LikeActions.totalFailure(response.problem))
  }
}
