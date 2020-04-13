import { call, put, select } from 'redux-saga/effects'
import { getToken, getTokenType } from 'Utils/Auth'
import UsersActions from 'Redux/UsersRedux'

const isWomen = state => state.settings.seekingWomen
const isMan = state => state.settings.seekingMan

export function * activeUsersRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)

  const isSeekingMan = yield select(isMan)
  const isSeekingWomen = yield select(isWomen)

  const params = {}
  if (isSeekingMan && !isSeekingWomen) params.gender = 'male'
  if (!isSeekingMan && isSeekingWomen) params.gender = 'female'

  const activeUsersResponse = yield call(api.getActiveUsers, params)

  if (activeUsersResponse.ok) {
    const activeUsers = activeUsersResponse.data.data
    yield put(UsersActions.activeUsersSuccess(activeUsers))
  } else {
    const problem = activeUsersResponse.problem
    yield put(UsersActions.activeUsersFailure(problem))
  }
}

export function * newUsersRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)

  const isSeekingMan = yield select(isMan)
  const isSeekingWomen = yield select(isWomen)

  const params = {}
  if (isSeekingMan && !isSeekingWomen) params.gender = 'male'
  if (!isSeekingMan && isSeekingWomen) params.gender = 'female'

  const newUsersResponse = yield call(api.getNewUsers, params)

  if (newUsersResponse.ok) {
    const newUsers = newUsersResponse.data.data
    yield put(UsersActions.newUsersSuccess(newUsers))
  } else {
    const problem = newUsersResponse.problem
    yield put(UsersActions.newUsersFailure(problem))
  }
}

export function * filterUsersRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)

  const filterUsersResponse = yield call(api.getMyFilters)

  if (filterUsersResponse.ok) {
    const filterUsers = filterUsersResponse.data.data
    yield put(UsersActions.filterUsersSuccess(filterUsers))
  } else {
    const problem = filterUsersResponse.problem
    yield put(UsersActions.filterUsersFailure(problem))
  }
}
