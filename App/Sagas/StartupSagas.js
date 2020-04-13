import { put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import PushNotification from 'react-native-push-notification'
import BadgeAndroid from 'react-native-android-badge'

import { MessageBarManager } from 'Components/MessageBarEngine'
import { Actions } from 'react-native-router-flux'
import { getToken, getTokenType } from 'Utils/Auth'
import { IS_IOS } from 'Themes'

import LoginActions from 'Redux/LoginRedux'

export function * startup (api) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token && tokenType) {
    api.setToken(token)
    api.setTokenType(tokenType)

    const response = yield call(api.auth)
    if (response.ok) {
      yield put(LoginActions.loginRequest(token, tokenType))
    } else {
      AsyncStorage.removeItem('token')
      AsyncStorage.removeItem('token-type')
      Actions.replace('launchScreen')
      MessageBarManager.showAlert({
        title: 'Login problem',
        message: 'Server error, sorry',
        alertType: 'error'
      })
      yield put(LoginActions.loginFailure(response.problem))
    }
  } else {
    Actions.replace('launchScreen')
    if (IS_IOS) {
      PushNotification.setApplicationIconBadgeNumber(0)
    } else {
      BadgeAndroid.setBadge(0)
    }
  }
}
