import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    paddingTop: isX ? '1rem' : 0
  },
  screenContent: {
    paddingHorizontal: '0.7rem',
    flex: 1
  },
  wrapper: {
    flex: 1
  },
  headerTotal: {
    backgroundColor: Colors.purplePink,
    borderRadius: '1rem',
    paddingHorizontal: '0.3rem',
    paddingVertical: '0.1rem',
    marginLeft: '0.3rem'
  },
  header: {
    backgroundColor: Colors.backgroundColor,
    height: '2.8rem'
  },
  subheader: {
    backgroundColor: Colors.backgroundColor,
    height: '2.5rem',
    marginTop: 0
  },
  headerTotalText: {
    fontFamily: Fonts.type.neue,
    color: '#fff',
    fontSize: '0.6rem',
    fontWeight: '600'
  },
  searchIcon: {
    height: '1.3rem',
    width: '1.3rem'
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    zIndex: 10
  }
})
