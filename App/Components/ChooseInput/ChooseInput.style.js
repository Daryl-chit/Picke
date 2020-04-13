import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import Color from 'color'

export default EStyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.pinkishGray,
    borderRadius: '2rem',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: '2.4rem',
    flex: 1,
    flexDirection: 'row',
  },
  wrap: {
    alignSelf: 'stretch'
  },
  text: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: '#111',
    fontSize: '1rem',
    paddingHorizontal: '1.0rem',
    paddingVertical: '0.5rem',
    alignSelf: 'flex-start',
    flex: 1
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
    minHeight: '2.4rem',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: '0.5rem',
    backgroundColor: Colors.pinkishGray,
    borderWidth: 0,
    borderColor: Color(Colors.pinkishGray).darken(0.11)
  },
  row: {
    marginVertical: '0.2rem'
  }
})
