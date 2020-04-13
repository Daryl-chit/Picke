import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  settings: {
    flex: 1
  },
  controlGroupContainer: {
    paddingVertical: '0.4rem',
    paddingRight: '0.8rem',
    paddingLeft: '1rem',
    borderWidth: 2.5,
    borderColor: '#e6e6e6',
    borderRadius: 3,
    marginBottom: '0.5rem'
  },
  controlGroup: {
    marginBottom: '1rem'
  },
  expander: {
    backgroundColor: '#fff',
    paddingVertical: '1rem',
    paddingHorizontal: '1rem',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1.5,
    shadowOpacity: 1
  },
  sectionHeaderText: {
    fontFamily: Fonts.type.base,
    fontWeight: '600',
    color: '#111',
    fontSize: '1.3rem',
    marginBottom: '1rem'
  },
  sectionTitleText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '0.88rem',
    color: '#979797',
    marginBottom: '0.6rem'
  }
})
