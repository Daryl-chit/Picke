import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  animatedLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '95%'
  },
  loaderImage: {
    height: '60%',
    width: '70%',
    resizeMode: 'contain'
  },
  loaderOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.4)',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
  }
})
