import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  component: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusText: {
    fontFamily: Fonts.type.neue,
    fontSize: '1.4rem',
    paddingHorizontal: '2.5rem',
    color: '#000',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3rem'
  },
  roundButtonText: {
    fontFamily: Fonts.type.neue,
    fontSize: '1.1rem',
    color: '#000',
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
})
