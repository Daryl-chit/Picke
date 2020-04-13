import EStyleSheet from 'react-native-extended-stylesheet'

import { Fonts, Colors, Metrics } from '../../Themes/'

export default EStyleSheet.create({
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.pinkishGray,
    borderRadius: '1.48rem',
    paddingVertical: '0.6rem',
    paddingHorizontal: '1.1rem'
  },
  roundButtonText: {
    fontFamily: Fonts.type.base,
    // textTransform: 'uppercase',
    fontSize: '1rem',
    color: Colors.greyish
  }
})
