import { StyleSheet, Dimensions, StatusBar } from 'react-native'
import { Colors } from 'Themes'

export const hairlineWidth = StyleSheet.hairlineWidth
import EStyleSheet from 'react-native-extended-stylesheet'

export default StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: Colors.black62
	}
})

export const sheetStyle = EStyleSheet.create({
	wrapper: {
		flex: 1,
		flexDirection: 'row'
	},
	bd: {
		flex: 1,
		alignSelf: 'flex-end',
		backgroundColor: Colors.transparent,
		margin: 10,
		borderRadius: 4
	},
	title: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.white,
		paddingTop: 20,
		paddingHorizontal: 30,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4
	},
	message: {
		alignItems: 'center',
		justifyContent: 'center',
    backgroundColor: Colors.white,
		paddingTop: 10,
		paddingBottom: 10,
		paddingHorizontal: 30
	},
	titleText: {
		color: '#000',
		fontSize: 20,
		textAlign: 'center'
	},
	messageText: {
		color: '#8f8f8f',
		fontSize: 15,
		textAlign: 'center'
	},
	borderTopRadius: {
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4
	},
	borderBottomRadius: {
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4
	}
})

export const btnStyle = StyleSheet.create({
	wrapper: {
		height: 45,
		marginTop: hairlineWidth,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	title: {
		fontSize: 18
	}
})
