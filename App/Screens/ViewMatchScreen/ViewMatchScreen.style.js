import { ApplicationStyles, Fonts, Colors } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: isX ? '1rem' : 0
  },
  header: {
    backgroundColor: Colors.backgroundColor
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoButton: {
  },
  userPhoto: {
    height: '12rem',
    width: '9rem',
    borderRadius: '1.5rem',
    marginBottom: '1rem',
    marginTop: '1rem'
  },
  contentHeader: {
  },
  headerText: {
    fontFamily: Fonts.type.base,
    color: '#000',
    fontSize: '2rem',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: '0.5rem'
  },
  userNameText: {
    fontFamily: Fonts.type.base,
    color: '#000',
    fontSize: '1.6rem',
    textAlign: 'center',
    fontWeight: '500'
  },
  userAge: {
    fontWeight: '300'
  },
  adviceText: {
    fontFamily: Fonts.type.base,
    color: '#6c6c6c',
    fontSize: '1rem',
    paddingHorizontal: '2rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: '1.5rem'
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem'
  },
  dateIcon: {
    height: '0.88rem',
    width: '0.88rem',
    marginRight: '0.5rem'
  },
  dateText: {
    fontFamily: Fonts.type.neue,
    color: '#8e8e8e',
    fontSize: '0.88rem',
    textAlign: 'center',
    lineHeight: '1.2rem',
    fontWeight: '400'
  },
  userLineIcon: {
    width: '1.5rem'
  },
  userButton: {
    paddingRight: '0.6rem'
  }
})
