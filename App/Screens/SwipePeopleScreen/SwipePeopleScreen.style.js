import { Metrics, ApplicationStyles, Fonts, Colors, width, height, IS_IOS } from 'Themes'
import { isX } from 'Tools'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screenContainer: {
    paddingTop: IS_IOS ? '1rem' : 0,
    height: height
  },
  userCards: {
    flex: 1
  },
  modal: {
    padding: '1.8rem',
    paddingBottom: '5rem',
    backgroundColor: Colors.white,
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
    color: Colors.black,
    fontSize: '1.3rem',
    marginBottom: '0.7rem'
  },
  modalText: {
    textAlign: 'center',
    fontFamily: Fonts.type.neue,
    color: Colors.text,
    fontSize: '0.9rem',
    lineHeight: '1.45rem'
  },
  modalButtonText: {
    color: Colors.purplePink,
    fontFamily: Fonts.type.base,
    fontSize: '1rem'
  }
})
