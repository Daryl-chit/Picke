import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: isX ? '1rem' : 0
  },
  userLineIcon: {
    width: '1.5rem'
  },
  userButton: {
    paddingRight: '0.6rem'
  }
})
