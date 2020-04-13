import { all, call, put, select } from 'redux-saga/effects'
import { AsyncStorage, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { MessageBarManager } from 'Components/MessageBarEngine'
import { LoginManager } from 'react-native-fbsdk'
import DeviceInfo from 'react-native-device-info'
import PushNotification from 'react-native-push-notification'
import BadgeAndroid from 'react-native-android-badge'
import { getToken, getTokenType, getDeviceToken } from 'Utils/Auth'
import { IS_IOS } from 'Themes'
import { DEFAULT_LOCATION, MIN_ACCEPTED_AGE, MAX_ACCEPTED_AGE } from 'Config/Constants'

import LoginActions from 'Redux/LoginRedux'
import UserActions from 'Redux/UserRedux'
import DictActions from 'Redux/DictRedux'
import VenuesActions from 'Redux/VenuesRedux'
import PeopleActions from 'Redux/PeopleRedux'
import LikeActions from 'Redux/LikeRedux'
import DialogsActions from 'Redux/DialogsRedux'
import MatchedUsersActions from 'Redux/MatchedUsersRedux'
import SettingsActions from 'Redux/SettingsRedux'

export const getInstagramToken = state => state.user.syncInstagram.token
export const getLocation = () => AsyncStorage.getItem('location').then(value => value)

export function * loginRequest (api, action) {
  const payload = { ...action }
  const { token, tokenType } = action
  const device_token = yield call(getDeviceToken)
  const version = DeviceInfo.getVersion()
  if (token) {
    AsyncStorage.setItem('token-type', tokenType)
    AsyncStorage.setItem('token', token)
    api.setToken(token)
    api.setTokenType(tokenType)
  }
  api.setHeader('app-platform', Platform.OS)
  api.setHeader('app-version', version)
  delete payload.type
  const response = yield call(api.auth, { device_token })
  if (response.ok) {
    const { data } = response
    const userInfo = data.data
    const { userId, update_required } = userInfo
    yield put(LoginActions.loginSuccess(userInfo))
    if (update_required && update_required == 1) {
      Actions.replace('launchScreen')
    } else if (userId) {
      yield put(UserActions.setUserLocal({ userInfo, token, userId }))
      api.deleteHeader('app-platform')
      api.deleteHeader('app-version')
      const userData = yield call(api.getUserData, { userId })
      if (userData.ok) {
        const user = userData.data.data
        yield put(UserActions.userSuccess(user))
        const isFirst = isFirstUser(user)

        if (isFirst) {
          Actions.replace('userParamsScreen')
        } else if (Actions.currentScene !== 'chatScreen') {
          if (user.is_hidden) {
            Actions.replace('messagesScreen')
          } else {
            Actions.replace('mainScreen')
          }
        }

        let location = yield call(getLocation)

        if (location && DeviceInfo.isEmulator() === false) {
          location = JSON.parse(location)
          yield put(UserActions.setLocation(location))
        } else {
          yield put(UserActions.setLocation(DEFAULT_LOCATION))
        }

        const { last_searched_gender } = userInfo
        if (last_searched_gender === 'male') {
          yield put(SettingsActions.editSettings({ seekingMan: true, seekingWomen: false }))
        } else if (last_searched_gender === 'female') {
          yield put(SettingsActions.editSettings({ seekingMan: false, seekingWomen: true }))
        } else {
          yield put(SettingsActions.editSettings({ seekingMan: true, seekingWomen: true }))
        }
        yield put(SettingsActions.editSettings({ excludeUsers: [] }))

        yield put(LoginActions.fetchStartup())
      }
    }
  } else {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('token-type')
    Actions.replace('launchScreen')
    MessageBarManager.showAlert({
      title: 'Login failed',
      message: 'Server error',
      alertType: 'error'
    })
    yield put(LoginActions.loginFailure(response.problem))
  }
}

export function * smsLoginRequest (api, action) {
  const payload = { ...action }
  const { code } = action
  const device_token = yield call(getDeviceToken)
  const version = DeviceInfo.getVersion()
  if (code) {
    api.setHeader('fb-account-kit-code', code)
    api.setTokenType('fb-account-kit')
  }
  api.setHeader('app-platform', Platform.OS)
  api.setHeader('app-version', version)

  delete payload.type
  const response = yield call(api.auth, { device_token })
  if (response.ok) {
    const { data } = response
    const userInfo = data.data
    const { userId, fb_token, update_required } = userInfo
    yield put(LoginActions.loginSuccess(userInfo))
    if (update_required && update_required == 1) {
      Actions.replace('launchScreen')
    } else if (userId) {
      AsyncStorage.setItem('token-type', 'fb-account-kit')
      AsyncStorage.setItem('token', fb_token)
      yield put(UserActions.setUserLocal({ userInfo, token: fb_token, userId }))
      api.deleteHeader('fb-account-kit-code')
      api.deleteHeader('app-platform')
      api.deleteHeader('app-version')
      api.setToken(fb_token)
      const userData = yield call(api.getUserData, { userId })
      if (userData.ok) {
        const user = userData.data.data
        yield put(UserActions.userSuccess(user))
        const isFirst = isFirstUser(user)
        if (isFirst) {
          Actions.replace('userParamsScreen')
        } else {
          if (user.is_hidden) {
            Actions.replace('messagesScreen')
          } else {
            Actions.replace('mainScreen')
          }
        }

        let location = yield call(getLocation)

        if (location && DeviceInfo.isEmulator() === false) {
          location = JSON.parse(location)
          yield put(UserActions.setLocation(location))
        } else {
          yield put(UserActions.setLocation(DEFAULT_LOCATION))
        }

        const { last_searched_gender } = userInfo
        if (last_searched_gender === 'male') {
          yield put(SettingsActions.editSettings({ seekingMan: true, seekingWomen: false }))
        } else if (last_searched_gender === 'female') {
          yield put(SettingsActions.editSettings({ seekingMan: false, seekingWomen: true }))
        } else {
          yield put(SettingsActions.editSettings({ seekingMan: true, seekingWomen: true }))
        }
        yield put(SettingsActions.editSettings({ excludeUsers: [] }))
        yield put(LoginActions.fetchStartup())
      }
    }

  } else {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('token-type')
    Actions.replace('launchScreen')
    MessageBarManager.showAlert({
      title: 'Login failed',
      message: 'Server error',
      alertType: 'error'
    })
    yield put(LoginActions.loginFailure(response.problem))
  }
}

function isFirstUser (user) {
  const { age, gender, height, occupations, religion, bodyTypes, ethnicities, photos } = user
  if (age === null || age === '') {
    return true
  } else if (parseInt(age) < MIN_ACCEPTED_AGE || parseInt(age) > MAX_ACCEPTED_AGE) {
    return true
  }
  if (gender === null || gender === '') {
    return true
  }
  if (height === null || height === '0.00') {
    return true
  }
  if (occupations === null || occupations.length == 0 ) {
    return true
  }
  if (religion === null) {
    return true
  }
  if (bodyTypes === null || bodyTypes.length == 0) {
    return true
  }
  if (ethnicities === null || ethnicities.length == 0) {
    return true
  }
  if (photos === null || photos.length == 0) {
    return true
  }
  return false
}

export function * logoutRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.logout)
  if (response.ok) {
    yield put(LoginActions.logoutSuccess())
    yield put(UserActions.logout())
    if (tokenType === 'fb') {
      LoginManager.logOut()
    }
    Actions.replace('launchScreen')
    if (IS_IOS) {
      PushNotification.setApplicationIconBadgeNumber(0)
    } else {
      BadgeAndroid.setBadge(0)
    }
  } else {
    yield put(LoginActions.logoutFailure(response.problem))
  }
}

export function * fetchStartup (api, action) {
  yield all([
    put(DialogsActions.totalsRequest()),
    put(LikeActions.likedRequest()),
    put(PeopleActions.peopleRequest()),
    put(DictActions.dictRequest()),
    put(VenuesActions.venuesRequest())
  ])
}
