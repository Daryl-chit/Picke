import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  setDict: ['payload'],
  dictRequest: null,
  dictError: ['problem'],
  dictSuccess: null
})

export const DictTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  ethnicities: [],
  occupations: [],
  bodyTypes: [],
  religions: [],
  fetching: false,
  error: null
})

const request = (store, action) => {
  return store.merge({
    fetching: true
  })
}

const success = (store, action) => {
  return store.merge({
    fetching: false, error: null
  })
}

const error = (store, action) => {
  return store.merge({
    fetching: false, error: true
  })
}

const setDict = (store, action) => {
  const { option, value } = action.payload
  return store.merge({
    [option]: value
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DICT]: setDict,
  [Types.DICT_SUCCESS]: success,
  [Types.DICT_REQUEST]: request,
  [Types.DICT_ERROR]: error
})
