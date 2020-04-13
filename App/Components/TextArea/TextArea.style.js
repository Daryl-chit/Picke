import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import Color from 'color'

export default EStyleSheet.create({
  textArea: {
    minHeight: '6rem'
  },
  label: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: Colors.text,
    fontSize: '0.8rem',
    marginBottom: '0.5rem'
  },
  description: {
    color: Colors.pinkishGray
  },
  row: {
    marginVertical: '0.5rem'
  },
  wrap: {
    alignSelf: 'stretch'
  },
  roundInputPlane: {
    borderWidth: 2,
    borderColor: Colors.pinkishGray,
    borderRadius: '1.2rem',
    paddingVertical: '0.6rem',
    paddingHorizontal: '0.6rem',
  },
  textArea: {
    minHeight: '4rem',
    maxHeight: '4rem',
    backgroundColor: Colors.white,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: '#111',
    fontSize: '1.1rem',
  }
})
