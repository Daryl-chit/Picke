import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import { AsyncStorage } from 'react-native'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  // github: require('./GithubRedux').reducer,
  user: require('./UserRedux').reducer,
  settings: require('./SettingsRedux').reducer,
  dict: require('./DictRedux').reducer,
  login: require('./LoginRedux').reducer,
  venues: require('./VenuesRedux').reducer,
  venue: require('./VenueRedux').reducer,
  users: require('./UsersRedux').reducer,
  people: require('./PeopleRedux').reducer,
  person: require('./PersonRedux').reducer,
  likes: require('./LikeRedux').reducer,
  matchedUsers: require('./MatchedUsersRedux').reducer,
  messages: require('./MessagesRedux').reducer,
  dialogs: require('./DialogsRedux').reducer,
  pusher: require('./PusherRedux').reducer,
  instagram: require('./InstagramRedux').reducer,
  notifications: require('./NotificationRedux').reducer,
  // router: require('./RouterRedux').reducer
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    AsyncStorage.getItem('device-token', (error, result) => {
      AsyncStorage.clear()
      if (error === null && result) {
        AsyncStorage.setItem('device-token', result)
      }
    })
    state = {}
  }
  return reducers(state, action)
}

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(rootReducer, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
