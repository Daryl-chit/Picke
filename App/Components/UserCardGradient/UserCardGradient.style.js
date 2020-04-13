import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    width: '100%'
  },
  photoCard: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.greyish,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  layoutBottom: {
    flex:1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardBottom: {
    flex: 1,
    width: '97%'
  },
  userInfo: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: '1rem',
    left: 0,
    right: 0,
    zIndex: 8
  },
  userName: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    paddingBottom: '0.5rem',
    marginBottom: '0.5rem'
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
  userDescText: {
    fontFamily: Fonts.type.neue,
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '300',
    height: '1.4rem'
  },
  userDesc: {
  },
  userDescContainer: {
    zIndex: 5,
    marginBottom: '1rem'
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
    bottom: '4.5rem',
    zIndex: 15
  },
  fadeGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})
