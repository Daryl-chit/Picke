import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import Color from 'color'

export default EStyleSheet.create({
  roundInputPlaneContainer: {
    borderWidth: 2,
    borderColor: Colors.pinkishGray,
    borderRadius: '1.2rem',
    paddingVertical: '0.4rem',
    paddingHorizontal: '1.3rem',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  roundInputPlane: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: '#111',
    fontSize: '1.1rem',
    paddingRight: '5rem'
  },
  textArea: {
    minHeight: '3rem'
  },
  buttonText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: Colors.text,
    fontSize: '0.75rem'
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
  button: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '0.5rem',
    backgroundColor: Colors.pinkishGray,
    borderWidth: 1,
    borderColor: Color(Colors.pinkishGray).darken(0.11)
  },
  row: {
    marginVertical: '0.5rem'
  }
})
