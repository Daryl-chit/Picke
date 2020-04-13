import { Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  container: {
    width: '100%',
    // paddingHorizontal: '1rem',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: '1.7rem',
    height: '1.7rem',
    marginRight: '0.5rem'
  },
  leftIcon: {
    width: '2.2rem',
    height: '2.2rem',
    marginLeft: '0.5rem'
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  textArea: {
    paddingVertical: '1rem',
    paddingLeft: '0.5rem',
    fontFamily: Fonts.type.neue,
    color: '#000',
    fontSize: '1rem'
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
})
