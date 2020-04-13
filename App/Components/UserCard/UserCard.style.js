import { Metrics, ApplicationStyles, Fonts, Colors, calcHeight, width, height, IS_IOS } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: '0.3rem',
    borderColor: '#999',
    overflow: 'hidden',
    height: IS_IOS ? isX ? calcHeight(0.85) : calcHeight(0.875) : calcHeight(0.865),
    zIndex: 2
  },
  photoCard: {
    flex: 1,
    width: '100%'
  },
  userInfo: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
    zIndex: 8
  },
  userName: {
    paddingBottom: '0.5rem',
    marginBottom: isX ? 0 : '0.5rem',
    paddingHorizontal: '1rem'
  },
  userNameText: {
    fontFamily: Fonts.type.neue,
    fontWeight: '700',
    fontSize: '1.5rem',
    color: '#fff'
  },
  userAgeText: {
    fontFamily: Fonts.type.neue,
    fontWeight: '300',
    color: '#fff'
  },
  userDistanceText: {
    fontFamily: Fonts.type.neue,
    color: Colors.white,
    fontSize: '1rem',
    fontWeight: '300',
    height: '1.4rem'
  },
  userDescText: {
    fontFamily: Fonts.type.neue,
    color: isX ? Colors.black : Colors.white,
    fontSize: '1rem',
    fontWeight: '300',
    height: '1.4rem'
  },
  userDesc: {
  },
  userDescContainer: {
    zIndex: 5,
    paddingBottom: '1rem',
    paddingTop: isX ? '0.5rem' : 0,
    paddingHorizontal: '1rem',
    backgroundColor: isX ? Colors.white : 'transparent',
  },
  moreIcon: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    width: '2.6rem',
    height: '2.8rem',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 7
  },
  icon: {
    width: '2rem',
    height: '2rem'
  },
  userPhotoCard: {
    flex: 1,
    borderWidth: 1
  },
  userPhotoImage: {
    flex: 1
  },
  messageInputPlus: {
    position: 'absolute',
    right: '0.5rem',
    bottom: '4.8rem',
    zIndex: 15
  },
  fadeGradient: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '12rem',
    zIndex: 1
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageIcon: {
    height: '2.5rem',
    width: '3.1rem'
  }
})
