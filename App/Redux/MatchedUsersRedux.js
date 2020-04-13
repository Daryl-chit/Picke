import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { removeDuplicates } from 'Tools'

const { Types, Creators } = createActions({
  matchedUsersRequest: ['offset'],
  matchedUsersSuccess: ['matchedUsers', 'offset'],
  matchedUsersFailure: ['problem'],
  markAsViewed: ['matchId']
})

export const MatchedUsersTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  list: [],
  fetching: null,
  error: null,
  problem: null,
  offset: 0,
  loaded: false
})

export const request = (state, action) => {
  return state.merge({ fetching: true, loaded: false, error: null, problem: null })
}

export const success = (state, action) => {
  const { list } = state
  const { offset } = action
  let newList = list.asMutable()
  const loaded = (action.matchedUsers.length === 0)
  if (offset > 0) {
    let oldList = list && list.length > 0 ? list.asMutable() : []
    newList = removeDuplicates([...oldList, ...action.matchedUsers], 'match_id')
  } else {
    newList = action.matchedUsers
  }
  return state.merge({
    fetching: false,
    error: null,
    list: newList,
    loaded,
    offset: action.offset
  })
}

export const failure = (state, problem) => {
  return state.merge({ fetching: false, error: true, loaded: false, problem })
}

export const markAsViewed = (state, action) => {
  const { matchId } = action
  let newList = state.list.asMutable()
  let elIndex = state.list.findIndex(f => f.match_id === matchId)
  if (elIndex > -1) {
    let item = { ...newList[elIndex], ...{ new_match: '0' } }
    newList[elIndex] = item
  }
  return state.merge({ list: newList })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MATCHED_USERS_REQUEST]: request,
  [Types.MATCHED_USERS_SUCCESS]: success,
  [Types.MATCHED_USERS_FAILURE]: failure,
  [Types.MARK_AS_VIEWED]: markAsViewed
})

