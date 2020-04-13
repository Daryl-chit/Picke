import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.black75,
    zIndex: 999
  },
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: '0.3rem'
  },
  close: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 0,
    width: '3rem',
    height: '3rem',
    zIndex: 4
  },
  closeIcon: {
    height: '1.3rem',
    width: '1.3rem'
  },
  rightGradient: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '11rem',
    height: '11rem',
    zIndex: 3
  },
  modalContent: {
    flex: 1
  }
})
