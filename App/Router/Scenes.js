import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Router,
  Scene,
  Reducer,
  Modal,
  Overlay,
  Lightbox,
  Stack,
  ActionConst,
  Actions
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
    return defaultReducer(state, action)
  }
}

export default Actions.create(
  <Router createReducer={reducerCreate}>
      <Scene
        key='root'
        hideNavBar>
        <Overlay key='overlay' hideNavBar>
          <Stack
            key='rootStack'
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
              key='swipePeopleScreen'
              component={SwipePeopleScreen} />
            <Scene
              key='activityScreen'
              component={ActivityScreen} />
            <Scene
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
              component={ViewMatchScreen} />
            <Scene
              key='chatScreen'
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
            {/* <Scene
              key='testScreen'
              component={TestScreen} /> */}
            <Scene
              key='hideAccountScreen'
              component={HideAccountScreen} />
            <Scene
              key='deleteAccountScreen'
              component={DeleteAccountScreen} />
            <Scene
              key='userCardScreen'
              component={UserCardScreen} />
          </Stack>
          <Scene component={MessageBar} />
        </Overlay>
      </Scene>
    </Router>
    )
