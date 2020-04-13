import { StyleSheet } from 'react-native'
import { Fonts, Metrics, Colors } from 'Themes'
import { isIphoneX } from 'Tools'

// console.log({ isIphoneX })
export default StyleSheet.create({
  applicationView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  }
})
