import EStyleSheet from 'react-native-extended-stylesheet'

import { width, height } from 'Themes'

export default EStyleSheet.create({
  modalWarp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  keyboardStyle: {
    flex: 1,
    paddingTop: 30
  },
  contentWarp: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: width,
    height: height
  },
  webView: {
    flex: 1
  },
  btnStyle: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 5,
    right: 5
  },
  closeStyle: {
    width: 30, height: 30
  }
})
