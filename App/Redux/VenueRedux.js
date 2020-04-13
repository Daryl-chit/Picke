import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  venueRequest: ['venueId'],
  venueSuccess: ['venue'],
  venueFailure: ['problem']
})

export const VenueTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  item: null,
  fetching: null,
  error: null,
  problem: null
})

export const request = (state) =>
  state.merge({ fetching: true, error: null, problem: null })

export const success = (state, action) =>
  state.merge({ fetching: false, error: null, item: action.venue })

export const failure = (state, problem) =>
  state.merge({ fetching: false, error: true, problem })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VENUE_REQUEST]: request,
  [Types.VENUE_SUCCESS]: success,
  [Types.VENUE_FAILURE]: failure
})
