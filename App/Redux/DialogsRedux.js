import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { removeDuplicates } from 'Tools'

const { Types, Creators } = createActions({
  dialogsRequest: ['offset'],
  dialogsSuccess: ['dialogs', 'offset'],
  dialogsFailure: ['problem'],
  totalsSuccess: ['totals'],
  totalsRequest: []
})

export const DialogsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  list: [],
  fetching: null,
  error: null,
  problem: null,
  totals: {
    new_dialogs: null,
    unread_messages: null
  },
  offset: 0,
  loaded: false
})

export const request = (state, action) => {
  return state.merge({
    fetching: true,
    error: null,
    problem: null,
    item: null,
    offset: action.offset === 0 ? 0 : state.offset
  })
}

export const success = (state, action) => {
  const { list } = state
  const { offset } = action
  let newList = list.asMutable()
  const loaded = (action.dialogs.length === 0)
  if (offset > 0) {
    let oldList = list && list.length > 0 ? list.asMutable() : []
    newList = removeDuplicates([...oldList, ...action.dialogs], 'match_id')
  } else {
    newList = action.dialogs
  }
  return state.merge({
    fetching: false,
    error: null,
    list: newList,
    loaded,
    offset
  })
}

export const totalsSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null, totals: action.totals })
}

export const totalsRequest = (state, action) => {
  return state.merge({ fetching: false, error: null })
}

export const failure = (state, problem) => {
  return state.merge({ fetching: false, error: true, problem })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DIALOGS_REQUEST]: request,
  [Types.DIALOGS_SUCCESS]: success,
  [Types.DIALOGS_FAILURE]: failure,
  [Types.TOTALS_SUCCESS]: totalsSuccess,
  [Types.TOTALS_REQUEST]: totalsRequest
})
