import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  spinner: {
    // width: '1rem',
    // height: '1rem'
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // borderWidth: 1,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
