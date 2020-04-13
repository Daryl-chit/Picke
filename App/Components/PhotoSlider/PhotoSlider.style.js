import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: '3.9rem',
    left: '1rem',
    right: '1rem',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  track: {
    backgroundColor: Colors.pinkishGray,
    overflow: 'hidden',
    height: 2
  },
  bar: {
    backgroundColor: Colors.purplePink,
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0
  },
  controlButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    flexDirection: 'row'
  },
  controlButton: {
    width: '50%'
  }
})
