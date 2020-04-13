import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  setSettings: ['payload'],
  editSettings: ['payload']
})

export const SettingsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  seekingMan: true,
  seekingWomen: true,
  searchByHeight: [],
  searchByBodyType: [],
  searchByReligion: [],
  searchByEthnicity: [],
  searchBySex: [],
  searchByDistance: 100,
  searchByAge: [],
  notifyNewMatches: true,
  notifyMessages: true,
  notifyMessagesPlus: true,
  notifyEmails: true,
  visibility: true,
  excludeUsers: []
})

const setSettings = (store, action) => {
  const { option, value } = action.payload
  return store.merge({
    [option]: value
  })
}

const editSettings = (store, action) => {
  const options = action.payload
  return store.merge({ ...options })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SETTINGS]: setSettings,
  [Types.EDIT_SETTINGS]: editSettings
})
