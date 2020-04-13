import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  bottomBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomBarContainer: {
    flex: 1,
    height: isX ? '3.85rem' : '3.2rem',
    paddingBottom: isX ? 15 : 0,
    backgroundColor: '#ededed'
  },
  barIcon: {
    resizeMode: 'contain'
  },
  barButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  barCell: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  messagesCount: {
    position: 'absolute',
    top: '-0.1rem',
    right: '1.2rem',
    backgroundColor: Colors.purplePink,
    borderRadius: '1.8rem',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '0.25rem',
    paddingVertical: '0.1rem'
  },
  messagesCountText: {
    fontFamily: Fonts.type.neue,
    fontSize: '0.6rem',
    color: '#fff'
  }
})
