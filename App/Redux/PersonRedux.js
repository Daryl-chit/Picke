import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  personRequest: ['personId'],
  personSuccess: ['person'],
  personFailure: ['problem'],
  unmatchRequest: ['user_id'],
  unmatchSuccess: ['unmatchData'],
  unmatchFailure: ['problem'],
  reportRequest: ['user_id', 'text'],
  reportSuccess: ['reportData'],
  reportFailure: ['problem'],
  blockRequest: ['user_id'],
  blockSuccess: ['blockData'],
  blockFailure: ['problem']
})

export const PersonTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  item: null,
  unmatchData: null,
  reportData: null,
  blockData: null,
  fetching: null,
  error: null,
  problem: null
})

export const request = (state, action) => {
  return state.merge({ fetching: true, error: null, problem: null, item: null })
}

export const success = (state, action) => {
  return state.merge({ fetching: false, error: null, item: action.person })
}

export const failure = (state, problem) => {
  return state.merge({ fetching: false, error: true, problem })
}

export const unmatchRequest = (state, action) => {
  return state.merge({ fetching: true, error: null, unmatchData: null, problem: null })
}

export const unmatchSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null, unmatchData: action.unmatchData })
}

export const unmatchFailure = (state, problem) => {
  return state.merge({ fetching: false, error: true, problem })
}

export const reportRequest = (state, action) => {
  return state.merge({ fetching: true, error: null, reportData: null, problem: null })
}

export const reportSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null, reportData: action.reportData })
}

export const reportFailure = (state, problem) => {
  return state.merge({ fetching: false, error: true, problem })
}

export const blockRequest = (state, action) => {
  return state.merge({ fetching: true, error: null, blockData: null, problem: null })
}

export const blockSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null, blockData: action.blockData })
}

export const blockFailure = (state, problem) => {
  return state.merge({ fetching: false, error: true, problem })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PERSON_REQUEST]: request,
  [Types.PERSON_SUCCESS]: success,
  [Types.PERSON_FAILURE]: failure,
  [Types.UNMATCH_REQUEST]: unmatchRequest,
  [Types.UNMATCH_SUCCESS]: unmatchSuccess,
  [Types.UNMATCH_FAILURE]: unmatchFailure,
  [Types.REPORT_REQUEST]: reportRequest,
  [Types.REPORT_SUCCESS]: reportSuccess,
  [Types.REPORT_FAILURE]: reportFailure,
  [Types.BLOCK_REQUEST]: blockRequest,
  [Types.BLOCK_SUCCESS]: blockSuccess,
  [Types.BLOCK_FAILURE]: blockFailure
})
