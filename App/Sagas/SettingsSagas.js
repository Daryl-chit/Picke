import { call, put, select } from 'redux-saga/effects'

import PeopleActions from 'Redux/PeopleRedux'
import { apiErrorHandler, notify } from 'Tools'

const getSettings = state => state.settings

export function * onSettingsChange (api, action) {

  let shouldReload = false
  let toggleVisibility = false
  const params = action.payload
  Object.keys(params).map(key => {
    if (key.includes('seeking') || key.includes('search')) shouldReload = true
  })

  if (shouldReload) {
    yield put(PeopleActions.peopleRequest({ clean: true }))
  }
}
