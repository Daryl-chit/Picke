import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  slideItem: {
    borderColor: '#ff0000'
  },
  slideImage: {
    height: '100%',
    width: '100%',
    borderColor: '#ff0000'
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 12,
    flexDirection: 'row'
  },
  three: {
    width: '33.4%',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  controlButton: {
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 13
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: isX ? '8.5rem' : '4.25rem',
    left: 0,
    right: 0,
    zIndex: 100
  },
  barItem: {
    height: 2
  },
  fadeGradient: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '80%',
    zIndex: 1
  },

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
