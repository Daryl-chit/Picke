import { call, put, select } from 'redux-saga/effects'
import { Alert } from 'react-native'
import { apiErrorHandler, notify } from 'Tools'
import { Actions } from 'react-native-router-flux'
import { getToken, getTokenType } from 'Utils/Auth'
import { LoginManager } from 'react-native-fbsdk'
import UserActions from 'Redux/UserRedux'

export const getUserId = state => state.user.userInfo.userId

export function * userChangeRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { option, value } = action.payload
  const params = { [option]: value }
  const response = yield call(api.editUser, params)
  if (response.ok) {
    const user = response.data.data
    yield put(UserActions.userSuccess(user))
  } else {
    apiErrorHandler(response, 'Edit profile failed')
  }
}

export function * addPhotoRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { photo } = action
  const response = yield call(api.addPhoto, { photo })
  api.setHeader('content-type', 'application/json')
  if (response.ok) {
    yield put(UserActions.addPhotoSuccess(response.data.data))
  } else {
    const problem = 'Photo upload failed'
    apiErrorHandler(response, problem)
    yield put(UserActions.addPhotoFailure(problem))
  }
}

export function * getUserRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  let userId = yield select(getUserId)
  if (!userId) userId = action.userId
  const response = yield call(api.getUserData, { userId })
  if (response.ok && response.data && response.data.data) {
    const user = response.data.data
    yield put(UserActions.userSuccess(user))
  } else {
    apiErrorHandler(response, 'Can\t get profile')
  }
}

export function * deletePhotoRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { id } = action
  let userId = yield select(getUserId)
  const response = yield call(api.removePhoto, { id, userId })
  if (response.ok && response.data) {
    yield put(UserActions.deletePhotoSuccess(id))
  } else {
    yield put(UserActions.deletePhotoFailure(response.problem))
    apiErrorHandler(response, 'Can\t delete photo')
  }
}

export function * syncInstagramRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { instagramToken } = action
  if (instagramToken) {
    const response = yield call(api.syncInstagram, { instagramToken })
    if (response.ok && response.data) {
      yield put(UserActions.getUserRequest())
      yield put(UserActions.syncInstagramSuccess(instagramToken))
    } else {
      yield put(UserActions.syncInstagramFailure(response.problem))
      apiErrorHandler(response, 'Can\t sync instagram')
    }
  } else {
    yield put(UserActions.syncInstagramFailure('NO_TOKEN'))
  }
}

export function * cleanInstagramRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.cleanInstagram)
  if (response.ok && response.data) {
    yield put(UserActions.cleanInstagramSuccess(response.data))
  } else {
    yield put(UserActions.syncInstagramFailure(response.problem))
  }
}

export function * deleteRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { reason } = action
  const response = yield call(api.removeAccount, { reason })
  if (response.ok && response.data) {
    yield put(UserActions.deleteSuccess(response.data))
    yield put(UserActions.logout())
    if (tokenType === 'fb') {
      LoginManager.logOut()
    }
    Actions.replace('launchScreen')
    notify('Account was deleted.')
  } else {
    yield put(UserActions.deleteFailure(response.problem))
    notify(response.problem)
  }
}

export function * hideRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.hideProfile)
  if (response.ok && response.data) {
    yield put(UserActions.hideSuccess(response.data))
    yield put(UserActions.getUserRequest())
  } else {
    yield put(UserActions.hideFailure(response.problem))
  }
}

export function * showRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.showProfile)
  if (response.ok && response.data) {
    const { data } = response.data
    const message = data[0]
    notify(message)
    yield put(UserActions.showSuccess(data))
    yield put(UserActions.getUserRequest())
  } else {
    yield put(UserActions.showFailure(response.problem))
  }
}

const getUserInfo = store => store.user.userInfo

export function * subscriptionRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  const { receipt } = action
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const response = yield call(api.validatePlus, { receipt })
  if (response.ok && response.data && response.data.data) {
    if (response.data.data.plus_membership_status === 'active') {
      let userInfo = yield select(getUserInfo)
      userInfo = {...userInfo, ...{ plusMember: '1' }}
      yield put(UserActions.setUserLocal({ userInfo }))
      Alert.alert('PICKE PLUS ACTIVATED', 'You can now use all Picke Plus features when using the app.')
    }
  } else {
    Alert.alert('PICKE PLUS NOT ACTIVATED', 'Server error, try again.')
  }
}

export function * subscriptionLogRequest (api, action) {
  const data = action.data || {}
  const userID = yield select(getUserId) || 0
  try {
    console.log({ userID, data: JSON.stringify(data) })
    yield call(api.subscriptionLog, { userID, data: JSON.stringify(data) })
  } catch (error) {
    console.log(error)
  }
}

export function * setLocationRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const { params } = action
  const response = yield call(api.setLocation, params)
  if (response.ok && response.data) {
    const location = { ...params }
    yield put(UserActions.setUserLocal({ location }))
  }
}
