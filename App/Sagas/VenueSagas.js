import { call, put } from 'redux-saga/effects'
import { getToken, getTokenType } from 'Utils/Auth'

import VenueActions from 'Redux/VenuesRedux'

export function * venueRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.getVenue, { venueId: action.venueId })
  if (response.ok) {
    const { data } = response
    const venues = data.data
    yield put(VenueActions.venueSuccess(venues))
  } else {
    yield put(VenueActions.venueFailure(response.problem))
  }
}
