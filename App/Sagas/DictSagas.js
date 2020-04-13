import { call, put } from 'redux-saga/effects'
import { getToken, getTokenType } from 'Utils/Auth'

import DictActions from 'Redux/DictRedux'

export function * dictRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const religions = yield call(api.getReligions)
  const occupations = yield call(api.getOccupations)
  const bodyTypes = yield call(api.getBodyTypes)
  const ethnicities = yield call(api.getEthnicities)

  if (religions.ok) {
    yield put(DictActions.setDict({ option: 'religions', value: religions.data.data }))
  } else {
    yield put(DictActions.dictError({ type: 'religions', problem: religions.problem, data: religions.data }))
  }
  if (occupations.ok) {
    yield put(DictActions.setDict({ option: 'occupations', value: occupations.data.data }))
  } else {
    yield put(DictActions.dictError({ type: 'occupations', problem: occupations.problem, data: occupations.data }))
  }
  if (bodyTypes.ok) {
    yield put(DictActions.setDict({ option: 'bodyTypes', value: bodyTypes.data.data }))
  } else {
    yield put(DictActions.dictError({ type: 'bodyTypes', problem: bodyTypes.problem, data: bodyTypes.data }))
  }
  if (ethnicities.ok) {
    yield put(DictActions.setDict({ option: 'ethnicities', value: ethnicities.data.data }))
  } else {
    yield put(DictActions.dictError({ type: 'ethnicities', problem: ethnicities.problem, data: ethnicities.data }))
  }

  if (ethnicities.ok && bodyTypes.ok && occupations.ok && religions.ok) {
    yield put(DictActions.dictSuccess())
  }
}
