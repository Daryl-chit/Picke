import React, { Component } from 'react'

import { AsyncStorage } from 'react-native'

import {
  Router,
  Scene,
  Reducer,
  Modal,
  Overlay,
  Lightbox,
  Stack,
  ActionConst
} from 'react-native-router-flux'

// import CardStackStyleInterpolator from './CardStackStyleInterpolator'

import LaunchScreen from 'Screens/LaunchScreen'

import {
  UserParamsScreen,
  SwipePeopleScreen,
  MainScreen,
  ActivityScreen,
  SwipePlacesScreen,
  MessagesScreen,
  ViewMatchScreen,
  ChatScreen,
  HideAccountScreen,
  DeleteAccountScreen,
  TestScreen,
  SavedPlacesScreen,
  EditProfileScreen,
  LikesScreen,
  LoadingScreen,
  UserCardScreen
} from 'Screens'

import {
  MessageBar
} from 'Components'

const reducerCreate = params => {
  const defaultReducer = Reducer(params)
  return (state, action) => {
    const { routeName, params } = action
    if (routeName === 'chatScreen') {
      if (params) {
        AsyncStorage.setItem('chat', JSON.stringify(params))
      } else {
        AsyncStorage.removeItem('chat')
      }
    } else {
      AsyncStorage.removeItem('chat')
    }
    return defaultReducer(state, action)
  }
}

// transitionConfig={() => ({
//   screenInterpolator: (props) => {
//     const { scene } = props
//     switch (scene.route.routeName) {
//       case 'mainScreen':
//         return CardStackStyleInterpolator.forVertical(props)
//       case 'messagesScreen':
//         return CardStackStyleInterpolator.forHorizontal(props)
//       case 'viewMatchScreen':
//         return CardStackStyleInterpolator.forFade(props)
//       default:
//         return CardStackStyleInterpolator.forInitial
//     }
//   }
// })}

export default class Navigation extends Component {
  render () {
    return (
      <Router createReducer={reducerCreate}>
        <Scene
          key='root'
          hideNavBar>
          <Scene
            initial
            key='loadingScreen'
            component={LoadingScreen} />
          <Scene
            key='launchScreen'
            component={LaunchScreen} />
          <Scene
            key='userParamsScreen'
            component={UserParamsScreen} />
          <Scene
            panHandlers={null}
            key='swipePeopleScreen'
            component={SwipePeopleScreen} />
          <Scene
            key='activityScreen'
            component={ActivityScreen} />
          <Scene
            panHandlers={null}
            key='mainScreen'
            component={MainScreen} />
          <Scene
            key='swipePlacesScreen'
            component={SwipePlacesScreen} />
          <Scene
            key='messagesScreen'
            component={MessagesScreen} />
          <Scene
            key='viewMatchScreen'
            panHandlers={null}
            component={ViewMatchScreen} />
          <Scene
            key='chatScreen'
            panHandlers={null}
            component={ChatScreen} />
          <Scene
            key='savedPlacesScreen'
            component={SavedPlacesScreen} />
          <Scene
            key='editProfileScreen'
            component={EditProfileScreen} />
          <Scene
            key='likesScreen'
            component={LikesScreen} />
          <Scene
            key='testScreen'
            component={TestScreen} />
          <Scene
            key='hideAccountScreen'
            component={HideAccountScreen} />
          <Scene
            key='deleteAccountScreen'
            component={DeleteAccountScreen} />
          <Scene component={MessageBar} />
          <Scene
            key='userCardScreen'
            component={UserCardScreen} />
        </Scene>
      </Router>
    )
  }
}
