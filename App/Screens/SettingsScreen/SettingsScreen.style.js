import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    paddingHorizontal: '0.8rem'
  },
  contentContainer: {
    paddingVertical: '0.5rem',
    flex: 1,
    justifyContent: 'space-between',
    minHeight: height * 0.82
  },
  content: {
    paddingHorizontal: '0.8rem',
    minHeight: isX ? height * 0.43 : 'auto'
  },
  controlGroupContainer: {
    paddingVertical: '0.4rem',
    paddingRight: '0.8rem',
    paddingLeft: '1rem',
    borderWidth: 2,
    borderColor: Colors.pinkishGray,
    borderRadius: 3,
    marginBottom: '0.5rem'
  },
  controlGroup: {
    marginBottom: '1rem'
  },
  banner: {
    marginBottom: '0.4rem'
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
    fontSize: '1rem',
    marginBottom: '1rem'
  },
  sectionTitleText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '1rem',
    color: '#979797',
    marginBottom: '0.6rem'
  }
})
