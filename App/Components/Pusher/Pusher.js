import React, { Component } from 'react'
import { createPusher, pusherEvents } from 'Services/Pusher'

import { Actions } from 'react-native-router-flux'
import { AsyncStorage, AppState } from 'react-native'
import PushNotification from 'react-native-push-notification'
import { decodeString } from 'Tools'

export default class Pusher extends Component {
  constructor (props) {
    super(props)
    this.state = {
      connected: false,
      route: null,
      appState: AppState.currentState
    }
    this.subscription = null
  }

  componentWillMount () {
    this.configurePushNotifications()
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      const { user } = this.props
      const { token } = user
      this.initPusher(token, user.userId)
    }
    if (nextAppState === 'inactive' || nextAppState === 'background') {
      if (this.pusher) {
        this.pusher.disconnect()
        this.pusher = null
        this.setState({ connected: false })
      }
    }
    this.setState({appState: nextAppState})
  }

  componentWillReceiveProps (next) {
    const { user } = this.props
    const { token } = user
    if (!token && next.user.token) {
      this.initPusher(next.user.token, next.user.userId)
    }
  }

  configurePushNotifications () {
    PushNotification.configure({
      onRegister: token => {
        if (token && token.token) {
          AsyncStorage.setItem('device-token', token.token)
        }
      },
      onNotification: notification => {
        const { data } = notification
        const { match_id, notification_type, user_id, sender_user_id } = data
        const notificationType = parseInt(notification_type)
        if (this.state.connected !== true && this.state.appState !== 'active') {
          if (notificationType === 3) {
            // new match
            this.openMatch({ matchId: match_id, userId: user_id })
          } else if (notificationType === 2) {
            // new message
            this.openChat({ userId: sender_user_id, matchId: match_id })
          } else if (notificationType === 1) {
            // new plus message
            this.openChat({ userId: sender_user_id, matchId: match_id })
          }
        }
      },
      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: '461510704104',
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    })
  }

  openMatch = ({ userId, matchId }) => {
    Actions.viewMatchScreen({
      userId,
      matchId
    })
  }
  openChat = ({ userId, matchId }) => {
    const { userChatId } = this.props
    const isSameChat = (userId === userChatId)
    const params = { userId, matchId }
    if (isSameChat) {
      Actions.replace('chatScreen', params)
    } else {
      Actions.chatScreen(params)
    }
  }

  initPusher = (token, userId) => {
    this.pusher = createPusher(token)
    this.subscription = this.pusher.subscribe(`private-user-${userId}`)

    this.pusher.connection.bind('connected', this.onConnected)
    this.pusher.connection.bind('failed', this.onConnectionFail)
    this.pusher.connection.bind('unavailable', this.onConnectionUnavailable)
    this.pusher.connection.bind('disconnected', this.onConnectionDisconnected)

    pusherEvents.map(ev => this.createChannel(this.subscription, ev))
  }

  createChannel = (channel, name) => {
    channel.bind(name, data => this.onEvent(data, name))
  }

  onConnectionUnavailable = data => {
    // console.log('Pusher Connection Unavailable', data)
  }

  onConnectionDisconnected = data => {
    // console.log('Pusher Disconnected', data)
  }

  onConnectionFail = data => {
    // console.log('Pusher Connection Fail', data)
  }

  onConnected = data => {
    this.setState({ connected: true })
  }

  onEvent = (data, name) => {
    const {
      matchedUsersRequest,
      dialogsRequest,
      getMessagesHistory,
      notifications,
      settings
    } = this.props

    const {
      notifyNewMatches,
      notifyMessages,
      notifyMessagesPlus,
      notifyEmails
    } = settings

    const { userId, matchId } = notifications
    if (this.state.connected === true) {
      if (name === 'match' && notifyNewMatches) {
        if (userId !== data.user.id && matchId !== data.match_id) {
          this.props.alert({
            type: 'match',
            title: data.user.name,
            message: decodeString(data.message),
            image: data.user.avatar && data.user.avatar.thumbs && data.user.avatar.thumbs.length > 0 ? data.user.avatar.thumbs[1] : '',
            userId: data.user.id,
            matchId: data.match_id,
            createAt: data.updated_at,
            plus: name === 'plus-message'
          })
        }
        matchedUsersRequest(0)
      } else if (name === 'match-message' && notifyMessages) {
        if (userId !== data.user_id && matchId !== data.user_match_id) {
          this.props.alert({
            type: 'message',
            title: data.user_name,
            message: decodeString(data.message),
            messageImage: data.message_image_path,
            image: data.user_avatar,
            userId: data.user_id,
            matchId: data.user_match_id,
            createAt: data.updated_at,
            plus: false
          })
          dialogsRequest(0)
        } else if (userId === data.user_id && matchId === data.user_match_id) {
          getMessagesHistory(matchId)
        }
      } else if (name === 'plus-message' && notifyMessagesPlus) {
        if (userId !== data.user_id && matchId !== data.user_match_id) {
          this.props.alert({
            type: 'message',
            title: data.user_name,
            message: decodeString(data.message),
            messageImage: data.message_image_path,
            image: data.user_avatar,
            userId: data.user_id,
            matchId: data.user_match_id,
            createAt: data.updated_at,
            plus: true
          })
          dialogsRequest(0)
        } else if (userId === data.user_id && matchId === data.user_match_id) {
          getMessagesHistory(matchId)
        }
      }
    }
  }

  render () {
    return null
  }
}

export const setPusherClient = pusherClient => {
  Pusher.pusherClient = pusherClient
}
