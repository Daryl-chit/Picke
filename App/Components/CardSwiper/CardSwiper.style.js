import { ApplicationStyles, Fonts, Colors, calcHeight, calcRem, IS_IOS } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  card: {
    flex: 1,
    justifyContent: 'flex-start',
    zIndex: 10,
    borderRadius: '0.3rem',
    overflow: 'hidden',
    // borderWidth: 0.5,
    // borderColor: '#999'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  },
  swipeBackButton: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    bottom: '40%'
  },
  swipeBackIcon: {
    height: '3rem',
    width: '3rem'
  },
  likesIcon: {
    height: '3rem',
    width: '3rem'
  },
  likesButton: {
    position: 'absolute',
    zIndex: 2,
    right: calcRem(1.5),
    top: isX ? calcRem(3.2) : calcRem(1.5)
  },
  swiperContainerRoot: {
    height: calcHeight(1)
  },
  swiperContainer: {
    height: IS_IOS ? isX ? calcHeight(0.85) : calcHeight(0.877) : calcHeight(0.875),
    zIndex: 5,
    position: 'relative'
  },
  swiperScrollView: {
    height: calcHeight(1),
    paddingTop: IS_IOS ? isX ? calcRem(2.2) : calcRem(0.5) : calcRem(0.5)
  },
  swiperScrollViewContainer: {
    paddingBottom: IS_IOS ? isX ? calcRem(8) : calcRem(5.5) : calcRem(6.5),
    paddingHorizontal: calcRem(0.8)
  },
  likesTotal: {
    position: 'absolute',
    top: '0.15rem',
    right: '-0.3rem',
    backgroundColor: Colors.purplePink,
    borderRadius: '1.2rem',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '0.3rem',
    paddingVertical: '0.1rem',
    zIndex: 3
  },
  totalText: {
    fontFamily: Fonts.type.neue,
    fontSize: '0.6rem',
    color: '#fff'
  },
  stack: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    justifyContent: 'flex-end',
    zIndex: 10
  },
  stackDecoratorAndroid: {
    position: 'absolute',
    width: '100%',
    height: '0.5rem',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ededed',
    overflow: 'visible'
  },
  stackDecorator: {
    width: '100%',
    height: '0.5rem',
    marginBottom: '-0.43rem',
    marginLeft: -0.5,
    marginRight: -0.5,
    overflow: 'visible'
  },
  statusContainer: {
    height: '1rem',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
})
