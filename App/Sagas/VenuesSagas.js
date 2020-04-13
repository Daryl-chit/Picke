import { call, put } from 'redux-saga/effects'
import { getToken, getTokenType } from 'Utils/Auth'

import VenuesActions from 'Redux/VenuesRedux'

export function * venuesRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.getVenues)
  if (response.ok) {
    const { data } = response
    const venues = data.data
    yield put(VenuesActions.venuesSuccess(venues))
  } else {
    yield put(VenuesActions.venuesFailure(response.problem))
  }
}
