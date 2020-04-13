import { call, put, takeEvery } from 'redux-saga/effects'

function * callAPI (api, action) {
  const method = action.type.split('_')[0].toLowerCase()
  const apiCall = api[method]
  const payload = { ...action }
  if (action.token) {
    api.setToken(action.token)
    delete action.token
  }
  delete payload.type
  const response = yield call(apiCall, { ...payload })
  if (response.ok) {
    const newType = action.type.replace('_REQUEST', '_SUCCESS')
    const { data } = response
    yield put({ type: newType, data: data.data })
  } else {
    const newType = action.type.replace('_REQUEST', '_FAILURE')
    yield put({
      type: newType,
      problem: response.problem,
      status: response.status
    })
  }
}

export default function * watchRequest (api) {
  yield takeEvery(action => /^.*_REQUEST/.test(action.type), callAPI, api)
}
