import { ApplicationStyles, Fonts, Colors, calcHeight, calcWidth } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: '0.8rem'
  },
  info: {
    width: '100%',
    paddingHorizontal: '3rem',
    paddingVertical: '1rem',
    backgroundColor: Colors.transparent,
    alignItems: 'center'
  },
	infoTitle: {
		fontSize: '1.5rem',
		fontWeight: 'bold',
		color: Colors.black,
		marginBottom: '1rem',
    textAlign: 'center'
	},
  infoDescription: {
    fontSize: '1rem',
    color: Colors.black,
    textAlign: 'center'
  },
  deleteItem: {
    width: calcWidth(0.48),
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
