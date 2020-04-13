import { Metrics, ApplicationStyles, Fonts, Colors, rem, width, height } from 'Themes'

import Color from 'color'

import EStyleSheet from 'react-native-extended-stylesheet'

const { type } = Fonts

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  phone: {
    color: Colors.purplePink,
    marginBottom: 0,
    fontFamily: Fonts.type.medium,
    fontSize: '1.05rem'
  },
  countryCode: {
    textAlign: 'center',
    fontFamily: type.base,
    fontSize: '1.3rem',
    paddingHorizontal: '0.5rem',
    color: Colors.text
  },
  label: {
    fontSize: '1rem',
    fontFamily: Fonts.type.medium,
    color: Colors.text,
    fontWeight: '500',
    marginBottom: '0.1rem'
  },
  description: {
    textAlign: 'center',
    fontFamily: type.base,
    fontSize: '0.7rem',
    lineHeight: '1.15rem',
    marginTop: '1rem',
    marginBottom: '0rem',
    paddingHorizontal: '1.3rem',
    color: Colors.text
  },
  codeInputContainer: {
    marginVertical: 0.2 * rem,
    height: 4.5 * rem,
    alignItems: 'center',
    justifyContent: 'center'
  },
  codeInput: {
    fontFamily: Fonts.type.base,
    fontSize: '1.4rem',
    width: '3rem',
    height: '3rem',
    color: '#111',
    backgroundColor: Color('#e1e1e1').lighten(0.05)
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: '1.5rem',
    paddingHorizontal: '2rem'
  },
  purpleLink: {
    paddingVertical: '0.85rem'
  },
  purpleLinkText: {
    fontFamily: Fonts.type.medium,
    fontSize: '0.75rem',
    textDecorationLine: 'underline',
    color: Colors.purplePink
  },
  nextButton: {
    width: '85%'
  }
})
