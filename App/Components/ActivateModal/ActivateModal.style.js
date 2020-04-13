import { Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors, calcHeight } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  modal: {
    padding: '1.8rem',
    paddingBottom: '5rem',
    backgroundColor: '#fff',
    borderRadius: '1rem'
  },
  modalButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.pinkishGray
  },
  modalHeaderText: {
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    color: '#000',
    fontSize: '1.5rem',
    marginBottom: '0.7rem'
  },
  modalText: {
    textAlign: 'center',
    fontFamily: Fonts.type.neue,
    color: Colors.text,
    fontSize: '1.05rem',
    lineHeight: '1.45rem'
  },
  modalButtonText: {
    color: Colors.purplePink,
    fontFamily: Fonts.type.base,
    fontSize: '1rem'
  }
})
