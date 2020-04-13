import { MessageBarManager } from 'Components/MessageBarEngine'
import { Fonts, Colors, calcRem } from 'Themes'

import { Actions } from 'react-native-router-flux'
import { isX } from 'Tools'

const titleStyle = {
  fontFamily: Fonts.type.neue,
  fontSize: calcRem(1),
  fontWeight: '500'
}

const stylesheetExtra = {
  backgroundColor: '#fff',
  strokeColor: '#ddd'
}

const messageStyle = {
  fontFamily: Fonts.type.neue,
  fontSize: calcRem(0.9),
  marginTop: calcRem(0.35),
  fontWeight: '400'
}

export const notify = ({ title, message, avatar }, onTapped) => {
  MessageBarManager.showAlert({
    title: title,
    message: message,
    avatar: avatar,
    titleStyle: titleStyle,
    messageStyle: messageStyle,
    duration: 3700,
    onTapped,
    stylesheetExtra,
    viewTopInset: isX ? 40 : 20
  })
}

export const notifyNewMessage = ({ matchId, userId, title, message, avatar }) => {
  notify({ title, message, avatar }, () => {
    // Actions.chatScreen({ matchId, userId })
  })
}

export const notifyNewMatch = ({ matchId, userId, title, message, avatar }) => {
  notify({ title, message, avatar}, () => {
    // Actions.viewMatchScreen({ matchId, userId })
  })
}
