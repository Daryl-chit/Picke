import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectList: {
    borderRadius: '1rem',
    backgroundColor: '#fff',
    paddingVertical: '1rem',
    paddingHorizontal: '0.2rem',
    maxHeight: height * 0.8
  }
})
