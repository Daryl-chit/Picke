import React, { Component } from 'react';
import { AppState, View, Button, Text, StyleSheet } from 'react-native'
import PushNotification from 'react-native-push-notification'
import PushController from './PushController.js'

import { notifyNewMessage } from 'Tools/Notifications'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
    this.sendNotification = this.sendNotification.bind(this)
  }
  
  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange)
  }
  
  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }
  
  // This will notify the user in 3 seconds after sending the app to the 
  // background (like after pressing the home button or switching apps)
  handleAppStateChange (appState) {
    if (appState === 'background') {
      // Schedule a notification
      PushNotification.localNotificationSchedule({
        message: 'Scheduled delay notification message', // (required)
        date: new Date(Date.now() + (3 * 1000)) // in 3 secs
      })
    }
  }

  sendNotification () {
    notifyNewMessage({
      title: 'New message from Mike',
      message: 'Hey, wtf, dude...',
      userId: '78264',
      matchId: '31467027',
      avatar: 'https://vignette.wikia.nocookie.net/4chanmusic/images/7/75/1635465156.jpg/revision/latest/scale-to-width-down/250?cb=20130126174859'
    })
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title='Press here for a notification'
          onPress={this.sendNotification} />
        <PushController />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})