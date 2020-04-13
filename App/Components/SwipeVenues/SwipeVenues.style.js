import { Metrics, ApplicationStyles, Fonts, Colors, rem, calcHeight, width, height, IS_IOS } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    // flex: 1,
    paddingTop: isX ? '2.25rem' : '0.5rem',
    paddingHorizontal: '0.8rem',
    // borderWidth: 0.5,
    // height: height - 2.25 * rem
  },
  favButton: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.2rem',
    zIndex: 1
  },
  favIcon: {
    height: '3rem',
    width: '3rem'
  },
  card: {},
  swiperContainer: {
    height: IS_IOS ? isX ? calcHeight(0.845) : calcHeight(0.877) : calcHeight(0.875),
    zIndex: 5
  },
  stack: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: '#999',
    justifyContent: 'flex-end',
    zIndex: 10
  },
  stackDecoratorAndroid: {
    position: 'absolute',
    width: '100.4%',
    height: '0.5rem',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ededed',
    overflow: 'visible'
  },
  stackDecorator: {
    width: '100.4%',
    height: '0.5rem',
    marginBottom: '-0.43rem',
    marginLeft: -0.5,
    marginRight: -0.5,
    overflow: 'visible'
  }
})
