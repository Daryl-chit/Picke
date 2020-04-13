import { ApplicationStyles, Fonts, Colors, calcHeight, calcWidth } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
	...ApplicationStyles.screen,
	wraper: {
  	position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: Colors.black95
	},
	overlay: {
		flex: 1,
		backgroundColor: Colors.transparent
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		top: calcHeight(0.15)
	},
	title: {
		fontSize: '2rem',
		fontWeight: 'bold',
		color: Colors.white,
		marginBottom: '2rem'
	},
	photoContainer: {

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
		width: '3.5rem',
		height: '3.5rem'
	},
	description: {
		marginTop: '3rem',
		width: calcWidth(0.64),
		fontSize: '1rem',
		textAlign: 'center',
		color: Colors.white
	},
	confirmText: {
		marginTop: '2.5rem',
		fontSize: '1.2rem',
		textAlign: 'center',
		color: Colors.white
	},
	buttonContainer: {
		position: 'absolute',
		bottom: '1rem',
		left: '1rem',
		right: '1rem',
		height: '3.5rem',
		backgroundColor: Colors.transparent,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	rightButton: {
		flex: 1,
		justifyContent: 'center',
    alignItems: 'center',
		borderWidth: '0.1rem',
		borderColor: Colors.white,
		borderRadius: '0.3rem',
		width: '46%',
		marginRight: '0.5rem'
  },
  leftButton: {
		flex: 1,
		justifyContent: 'center',
    alignItems: 'center',
		borderWidth: '0.1rem',
		borderColor: Colors.purplePink,
		borderRadius: '0.3rem',
		width: '46%',
		marginRight: '0.5rem'
  },
	buttonText: {
		fontSize: '1.2rem',
		color: Colors.white
	}
})
