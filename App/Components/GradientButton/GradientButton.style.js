import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  buttonContainer: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderColor: 'transparent'
  },
  borderButton: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: '3rem'
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3rem',
    paddingVertical: '0.65rem',
    paddingHorizontal: '1rem'
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.type.base,
    fontWeight: '500',
    fontSize: '1.15rem',
    backgroundColor: 'rgba(0,0,0,0)'
  }
})
