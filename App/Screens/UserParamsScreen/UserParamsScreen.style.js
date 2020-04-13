import { ApplicationStyles, Fonts, Colors } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
import Color from 'color'

import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: isX ? '1rem' : 0
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    marginTop: '0.5rem'
  },
  scrollViewContainer: {
    backgroundColor: '#fff',
    paddingVertical: '0.5rem'
  },
  keyboardAvoidingContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  },
  body: {
    paddingHorizontal: '1.8rem',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  topIcon: {
    width: '9rem'
  },
  topIconWrap: {
    marginBottom: '0rem',
    height: '8.3rem'
  },
  passwordInfo: {
    marginTop: '1.5rem',
    marginBottom: '1.6rem'
  },
  titleText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '1.6rem',
    color: Colors.purplePink
  },
  errorText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '0.8rem',
    color: '#f00',
    marginTop: '-0.3rem',
    marginBottom: '0.3rem'
  },
  sexButtons: {
    marginTop: '1.7rem'
  },
  buttonMargin: {
    marginTop: '1.1rem'
  },
  buttonText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '1.25rem'
  },
  buttons: {
    alignSelf: 'stretch',
    marginBottom: '0.5rem'
  },
  button: {
    marginBottom: '0.5rem'
  },
  bottomLabel: {
    marginTop: '0.3rem'
  },
  labelTextSmall: {
    fontSize: '0.7rem',
    fontFamily: Fonts.type.base,
    color: Colors.text
  },
  bottomButton: {
    position: 'absolute',
    bottom: '2rem',
    left: 0,
    right: 0
  },
  photoButtons: {
    marginVertical: '2.2rem'
  },
  mainPhotoContainer: {
    marginTop: '-0.15rem',
    backgroundColor: Color(Colors.greyish).lighten(0.4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '2rem',
    borderWidth: 1.5,
    borderRadius: '0.5rem',
    borderColor: Color(Colors.greyish).lighten(0.3),
    paddingVertical: '5.3rem',
    height: '88%'
  },
  photoBody: {
    flex: 1,
    paddingHorizontal: '1rem',
    paddingVertical: '1rem'
  },
  photoButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoIcon: {
    width: '5.5rem'
  },
  photoText: {
    color: '#000',
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    textAlign: 'center',
    fontSize: '1.65rem'
  },
  iconText: {
    color: '#000',
    fontFamily: Fonts.type.base,
    fontWeight: '500',
    fontSize: '0.9rem',
    letterSpacing: '0.09rem'
  },
  photoInfo: {
    position: 'absolute',
    bottom: '2rem',
    left: '12%',
    right: '12%'
  },
  separator: {
    position: 'absolute',
    left: '44%',
    right: '44%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)', //Color(Colors.grayish).lighten(0.2),
    bottom: '11rem'
  },
  photoInfoText: {
    color: Colors.text,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '0.9rem',
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: '1.4rem'
  }
})
