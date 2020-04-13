import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleIcon: {
    height: '2.3rem',
    width: '1.9rem',
    borderRadius: '0.3rem',
    marginRight: '0.5rem'
  },
  titleText: {
    fontFamily: Fonts.type.neue,
    color: '#282828',
    fontSize: '1.1rem',
    textAlign: 'center',
    fontWeight: '500'
  }
})
