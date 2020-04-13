import { Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
import { isX } from 'Tools'
const { width, height } = Dimensions.get('window')

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    backgroundColor: Colors.backgroundColor,
    flex: 1
  },
  container: {
    paddingHorizontal: '0.5rem',
    paddingTop: isX ? '1rem' : 0,
    flex: 1,
    flexDirection: 'column'
  }
})
