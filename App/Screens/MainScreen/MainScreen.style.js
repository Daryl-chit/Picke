import { ApplicationStyles } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  tabLayout: {
    flex: 1,
    backgroundColor: '#ededed'
  },
  content: {
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 0
  },
  buttons: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    zIndex: 1
  }
})
