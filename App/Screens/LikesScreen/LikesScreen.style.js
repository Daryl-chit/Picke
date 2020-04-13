import { Metrics, ApplicationStyles, Fonts, Colors, rem, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: '0.8rem',
    paddingTop: isX ? '1rem' : 0
  },
  info: {
    width: '100%',
    paddingHorizontal: '3rem',
    paddingVertical: '1rem',
    backgroundColor: '#fff',
    borderRadius: '0.3rem',
    shadowColor: "rgba(0, 0, 0, 0.35)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1.5,
    shadowOpacity: 1,
    alignItems: 'center',
    marginBottom: '1rem'
  },
  infoText: {
    fontFamily: Fonts.type.neue,
    fontSize: '0.7rem',
    color: '#6d6d72',
    textAlign: 'center',
    lineHeight: '1.15rem'
  },
  infoButton: {
    marginTop: '0.4rem'
  },
  toggleText: {
    color: Colors.purplePink,
    fontFamily: Fonts.type.neue,
    fontSize: '0.95rem',
    textAlign: 'center'
  },
  photoItem: {
    width: width * 0.48,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rem * 1
  }
})
