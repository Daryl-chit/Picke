import { ApplicationStyles, Colors } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  line: {
    position: 'absolute',
    backgroundColor: Colors.purplePink,
    height: 1,
    top: '0.3rem',
    left: 0,
    zIndex: 2
  },
  grayLine: {
    backgroundColor: Colors.pinkishGray,
    right: 0,
    zIndex: 1
  },
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  dots: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 3,
    alignSelf: 'stretch'
  },
  circle: {
    borderWidth: 1,
    height: '0.65rem',
    width: '0.65rem',
    borderRadius: '0.65rem',
    marginHorizontal: '0.25rem',
    backgroundColor: '#fff',
    borderColor: Colors.purplePink,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    height: '0.22rem',
    width: '0.22rem',
    borderRadius: '0.22rem',
    backgroundColor: Colors.purplePink
  }
})
