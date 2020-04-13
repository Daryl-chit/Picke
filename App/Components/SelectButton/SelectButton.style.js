import { ApplicationStyles, Fonts, Colors } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  buttonText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '1.25rem'
  },
  button: {
    marginBottom: '0.5rem'
  }
})
