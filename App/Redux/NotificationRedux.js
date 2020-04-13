import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  alert: ['props'],
  alertWithType: ['props'],
  setCurrent: ['props']
})

export const NotificationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  alert: null,
  alertWithType: null,
  key: 0,
  matchId: null,
  userId: null
})

export const alert = (state, action) => state.merge({
  alert: action.props,
  key: state.key + 1
})

export const alertWithType = (state, action) => state.merge({
  alertWithType: action.props,
  key: state.key + 1
})

export const setCurrent = (state, action) => state.merge({
  matchId: action.props.matchId,
  userId: action.props.userId
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALERT]: alert,
  [Types.ALERT_WITH_TYPE]: alertWithType,
  [Types.SET_CURRENT]: setCurrent
})
