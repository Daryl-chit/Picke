import { ApplicationStyles, Fonts, Colors, calcHeight, calcWidth } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: '0.8rem'
  },
  container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		top: calcHeight(0.05)
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: 'bold',
		color: Colors.black,
		marginBottom: '2rem'
	},
	photo: {
		width: calcWidth(0.4),
		height: calcHeight(0.3),
		borderRadius: '1rem'
	},
	icon: {
		position: 'absolute',
		right: '-1.5rem',
		bottom: '-1.5rem',
		width: '3rem',
		height: '3rem'
	},
	description: {
		marginTop: '1.5rem',
		width: calcWidth(0.64),
		fontSize: '1rem',
		textAlign: 'center',
		color: Colors.black62
	},
	buttonContainer: {
		position: 'absolute',
		bottom: '1.5rem',
		left: '1.5rem',
		right: '1.5rem',
		height: '5.5rem',
		backgroundColor: Colors.transparent,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	hideButton: {
		flex: 1,
		justifyContent: 'center',
    alignItems: 'center',
		borderWidth: '0.1rem',
		borderColor: Colors.purplePink,
		borderRadius: '0.3rem',
    backgroundColor: Colors.purplePink,
		width: '100%',
    height: '2.5rem',
    marginBottom: '0.5rem'
  },
  deleteButton: {
		flex: 1,
		justifyContent: 'center',
    alignItems: 'center',
		borderWidth: '0.1rem',
		borderColor: Colors.black62,
		borderRadius: '0.3rem',
		width: '100%',
    height: '2.5rem'
  },
	buttonText: {
		fontSize: '1rem'
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
