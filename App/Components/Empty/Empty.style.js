import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  component: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    width: width
  },
  statusText: {
    fontFamily: Fonts.type.neue,
    fontSize: '2rem',
    paddingHorizontal: '2.5rem',
    color: '#000',
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
})
