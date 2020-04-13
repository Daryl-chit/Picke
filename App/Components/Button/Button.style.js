
import { Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  buttonContainer: {
    alignSelf: 'stretch',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3rem',
    paddingVertical: '0.65rem',
    borderColor: '#d4d4d4',
    paddingHorizontal: '1.1rem',
    height: '2.8rem'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3rem',
    paddingVertical: '0.65rem',
    paddingHorizontal: '1rem'
  },
  buttonText: {
    color: '#a3a3a3',
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '1rem',
    backgroundColor: 'rgba(0,0,0,0)'
  }
})
