import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  component: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  wrap: {
    flex: 1
  },
  modalContainer: {
    overflow: 'hidden',
    borderRadius: '0.3rem',
    marginTop: '2rem',
    zIndex: 3
  },
  close: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    zIndex: 2
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
    zIndex: 1
  },
  overlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    left: '-4rem',
    bottom: 0,
    width: width * 1.2,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 1
  },
  modalContent: {
  }
})
