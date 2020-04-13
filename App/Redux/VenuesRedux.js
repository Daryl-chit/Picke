import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  venuesRequest: null,
  venuesSuccess: ['venues'],
  venuesFailure: ['problem'],
  venueFavouritesAdd: ['venue'],
  venueFavouritesRemove: ['venueId']
})

export const VenuesTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  list: [],
  fetching: null,
  error: null,
  problem: null,
  favourites: []
})

export const request = (state) => {
  return state.merge({ fetching: true, error: null, problem: null })
}
export const success = (state, action) => {
  return state.merge({ fetching: false, error: null, list: action.venues })
}

export const failure = (state, problem) => {
  return state.merge({ fetching: false, error: true, problem })
}

export const favouritesAdd = (state, action) => {
  const { venue } = action
  const favourites = state.favourites ? state.favourites.asMutable() : []
  const is = favourites.find(f => f.id === venue.id) || false
  if (!is) favourites.push(venue)
  return state.merge({ favourites })
}

export const favouritesRemove = (state, action) => {
  const { venueId } = action
  const favourites = state.favourites
    ? state.favourites.asMutable().filter(f => f.id !== venueId) : []
  return state.merge({ favourites })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VENUES_REQUEST]: request,
  [Types.VENUES_SUCCESS]: success,
  [Types.VENUES_FAILURE]: failure,
  [Types.VENUE_FAVOURITES_ADD]: favouritesAdd,
  [Types.VENUE_FAVOURITES_REMOVE]: favouritesRemove
})
