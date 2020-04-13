import { call, put, select } from 'redux-saga/effects'
import { createPusher } from 'Services/Pusher'
import PusherActions from 'Redux/PusherRedux'

export function * pusherCreate (api, action) {
  const { token, userId } = action
  const pusher = createPusher(token)
  if (pusher) {
    yield put(PusherActions.createPusherSuccess(pusher))
  } else {
    yield put(PusherActions.createPusherFailure(pusher))
  }
}
