import { MessageBarManager } from 'Components/MessageBarEngine'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Fonts, Colors, calcRem } from 'Themes'

export const notify = (title, message, alertType) => {
  MessageBarManager.showAlert({
    title,
    message,
    alertType,
    position: 'bottom',
    animationType: 'SlideFromBottom'
  })
}

const s = EStyleSheet.create({
  titleText: {
    fontFamily: Fonts.type.neue,
    fontSize: '1.1rem',
    fontWeight: '400',
    marginBottom: '0.3rem',
    color: '#fff'
  },
  messageText: {
    fontFamily: Fonts.type.neue,
    fontSize: '1rem',
    fontWeight: '300',
    color: '#f1f1f1'
  }
})
