import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import Color from 'color'

import EStyleSheet from 'react-native-extended-stylesheet'

const { type } = Fonts

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  roundInputContainer: {
    borderRadius: '1.35rem',
    backgroundColor: Color('#e1e1e1').lighten(0.05),
    paddingVertical: '0.65rem',
    paddingHorizontal: '1.2rem',
    marginHorizontal: '0.3rem'
  },
  roundInput: {
    fontSize: '1.2rem',
    fontFamily: Fonts.type.base
  },
  countryFlag: {
    width: '1.8rem',
    height: '1.8rem'
  },
  countryCode: {
    textAlign: 'center',
    fontFamily: type.base,
    fontSize: '1.3rem',
    paddingHorizontal: '0.5rem',
    color: Colors.text
  },
  label: {
    fontFamily: type.base,
    fontSize: '1rem',
    marginBottom: '1.55rem',
    color: Colors.test
  },
  description: {
    textAlign: 'center',
    fontFamily: type.base,
    fontSize: '0.75rem',
    lineHeight: '1.2rem',
    marginTop: '1.6rem',
    marginBottom: '2.3rem',
    paddingHorizontal: '1.7rem',
    color: Colors.text
  },
  inputContainer: {
    width: '83%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: '1.5rem'
  },
  country: {
    paddingVertical: '0.5rem',
    paddingHorizontal: '0.6rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  nextButton: {
    width: '85%'
  }
})
