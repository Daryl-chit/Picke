import { call, put, select } from 'redux-saga/effects'
import { getToken, getTokenType } from 'Utils/Auth'
import PushNotification from 'react-native-push-notification'
import BadgeAndroid from 'react-native-android-badge'

import DialogsActions from 'Redux/DialogsRedux'
import { IS_IOS } from 'Themes'
import { DIALOGS_STEP } from 'Config/Constants'

const getOffset = state => state.dialogs.offset
const isFetchingDialogs = state => state.dialogs.fetching
export function * dialogsRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  const prevOffset = yield select(getOffset)
  const isFetching = yield select(isFetchingDialogs)
  const offset = action.offset === 0 ? 0 : prevOffset + DIALOGS_STEP
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.getDialogs, { offset })
  if (response.ok) {
    const { data } = response
    const dialogs = data.data
    yield put(DialogsActions.dialogsSuccess(dialogs, offset))
    yield put(DialogsActions.totalsRequest())
  } else {
    yield put(DialogsActions.dialogsFailure(response.problem))
  }
}

export function * totalsRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const totalsResponse = yield call(api.getMessagesTotals)
  if (totalsResponse.ok) {
    const data = totalsResponse.data.data
    const { unread_messages, new_dialogs } = data
    const pushNotificationCount = (unread_messages + new_dialogs) > 0 ? (unread_messages + new_dialogs) : 0
    if (IS_IOS) {
      PushNotification.setApplicationIconBadgeNumber(pushNotificationCount)
    } else {
      BadgeAndroid.setBadge(pushNotificationCount)
    }
    yield put(DialogsActions.totalsSuccess(totalsResponse.data.data))
  } else {
    yield put(DialogsActions.dialogsFailure(totalsResponse.problem))
  }
}
