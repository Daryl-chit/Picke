import { Image } from 'react-native'
import { call, put, select, all } from 'redux-saga/effects'
import { getToken, getTokenType } from 'Utils/Auth'
import PeopleActions from 'Redux/PeopleRedux'
import { apiErrorHandler, notify, getDictIdsByGender, getFeets, getInstagramPhotos, hasRemoteAccess, hasInstagramAccess } from 'Tools'
import { SEARCH_LOAD_ATTEMPTS } from 'Config/Constants'

const getSettings = state => state.settings
const getDict = state => state.dict

export function * onSettingsChange (api, action) {
  yield put(PeopleActions.peopleRequest({ clean: true }))
}

export function * peopleRequest (api, action) {
  const token = yield call(getToken)
  const tokenType = yield call(getTokenType)
  if (token) api.setToken(token)
  if (tokenType) api.setTokenType(tokenType)
  const settings = yield select(getSettings)

  let attempt = 1

  if (action.params && action.params.attempt) {
    attempt = action.params.attempt + 1
  }

  const {
    seekingMan,
    seekingWomen,
    searchByHeight,
    searchByBodyType,
    searchByReligion,
    searchByEthnicity,
    searchByDistance,
    searchByAge
  } = settings

  let params = {}

  if (action.params && action.params.clean) {
    yield put(PeopleActions.cleanRequest())
  }

  if (action.params && action.params.lastIds) params['exclude_users_ids'] = action.params.lastIds

  if (seekingMan && !seekingWomen) params['gender'] = 'male'

  if (!seekingMan && seekingWomen) params['gender'] = 'female'

  const dicts = yield select(getDict)

  if (searchByBodyType && searchByBodyType.length > 0) {
    const gender = params['gender'] ? params['gender'] : null
    params['bodytypes'] = getDictIdsByGender(searchByBodyType, 'bodyTypes', dicts, gender)
  }
  if (searchByReligion && searchByReligion.length > 0) params['religionId'] = searchByReligion
  if (searchByEthnicity && searchByEthnicity.length > 0) params['ethnicities'] = searchByEthnicity
  if (searchByAge && searchByAge.length > 1) params['age_min'] = searchByAge[0]
  if (searchByAge && searchByAge.length > 1) params['age_max'] = searchByAge[1]

  if (searchByHeight && searchByHeight.length > 1) params['height_min'] = getFeets(searchByHeight[0])
  if (searchByHeight && searchByHeight.length > 1) params['height_max'] = getFeets(searchByHeight[1])

  if (searchByDistance) {
    params['radius'] = searchByDistance
  } else {
    params['radius'] = 100
  }

  const response = yield call(api.search, params)
  if (response.ok && response.data && response.data.data) {
    const { data } = response
    if (data.status && data.status === 'error') {
      // notify('Error fetching users', data.message, 'error')
      yield put(PeopleActions.peopleFailure(data.message))
    } else {
      const people = data.data
      const { users } = people
      const usersList = Object.keys(users).map(key => users[key])
      // usersList.map(user => user.photos.map(photo => photosList.push({ uri: photo.path })))
      usersList.map(user => {
        if (user.photos.length > 0) {
          Image.prefetch(user.photos[0].path)
        }
      })

      yield put(PeopleActions.peopleSuccess(usersList))
    }
  // } else if (response.problem && attempt <= SEARCH_LOAD_ATTEMPTS) {
  //   yield put(PeopleActions.peopleRequest({ attempt }))
  } else {
    yield put(PeopleActions.peopleFailure(response.problem))
  }
}
