import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import Color from 'color'
import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    paddingHorizontal: '1.5rem',
    paddingVertical: '1.3rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color(Colors.pinkRed).lighten(0.6),
    borderWidth: 3
  },
  titleText: {
    fontFamily: Fonts.type.base,
    fontSize: '1.5rem',
    fontWeight: '400',
    color: Colors.pinkRed,
    marginBottom: '0.8rem'
  },
  messageText: {
    fontFamily: Fonts.type.base,
    fontSize: '1.1rem',
    fontWeight: '300',
    color: '#333',
    marginBottom: '0.35rem'
  },
})
