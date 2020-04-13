import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	Text, View, StyleSheet, Dimensions,
	Modal, TouchableHighlight, Animated, ScrollView
} from 'react-native'

import styles, { btnStyle, sheetStyle, hairlineWidth } from './ActionSheet.style'
import { width, height } from 'Themes'

const TITLE_H         = 40
const MESSAGE_H 		  = 180
const CANCEL_MARGIN  	= 6
const BUTTON_H 				= 45 + hairlineWidth
const WARN_COLOR 			= '#ff3b30'
const MAX_HEIGHT 			= height * 0.7


class ActionSheet extends Component {
	constructor(props) {
		super(props)
		this.scrollEnabled = false
		this.translateY = this._calculateHeight(props)
		this.state = {
			visible: false,
			sheetAnim: new Animated.Value(this.translateY)
		}
		this._cancel = this._cancel.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		this.translateY = this._calculateHeight(nextProps)
	}

	show() {
		this.setState({visible: true})
		this._showSheet();
	}

	hide(index) {
		this._hideSheet(() => {
			this.setState({visible: false})
			this.props.onPress(index)
		})
	}

	_cancel() {
		const { cancelButtonIndex } = this.props
		if (cancelButtonIndex > -1) {
			this.hide(cancelButtonIndex)
		}
	}

	_showSheet() {
		Animated.timing(this.state.sheetAnim, {
			toValue: 0,
			duration: 250
		}).start()
	}

	_hideSheet(callback) {
		Animated.timing(this.state.sheetAnim, {
			toValue: this.translateY,
			duration: 150
		}).start(callback || function() {})
	}

	_calculateHeight(props) {
		let count = props.options.length
		const titleHeight = props.titleHeight ? props.titleHeight : TITLE_H
		const messageHeight = props.messageHeight ? props.messageHeight : MESSAGE_H
		let height = BUTTON_H * count + CANCEL_MARGIN + 10
		if (props.title) height += titleHeight
    if (props.message) height += messageHeight
		if (height > MAX_HEIGHT) {
			this.scrollEnabled = true;
			return MAX_HEIGHT
		} else {
			this.scrollEnabled = false;
			return height
		}
	}

	_renderTitle() {
		const title = this.props.title

		if (!title) {
			return null
		}

		if (React.isValidElement(title)) {
			return (
				<View style={sheetStyle.title}>{title}</View>
			)
		}

		return (
			<View style={sheetStyle.title}>
				<Text style={sheetStyle.titleText}>{title}</Text>
			</View>
		)
	}

	_renderMessage() {
		const message = this.props.message

		if (!message) {
			return null
		}

		if (React.isValidElement(message)) {
			return (
				<View style={sheetStyle.message}>{message}</View>
			)
		}

		return (
			<View style={sheetStyle.message}>
				<Text style={sheetStyle.messageText}>{message}</Text>
			</View>
		)
	}

	_renderCancelButton() {
		let {options, cancelButtonIndex, tintColor} = this.props
		if (cancelButtonIndex > -1 && options[cancelButtonIndex]) {
			return (
				<TouchableHighlight
					activeOpacity={1}
					underlayColor="#f4f4f4"
					style={[btnStyle.wrapper, {marginTop: 6, borderRadius: 4}]}
					onPress={this._cancel}
				>
					<Text style={[btnStyle.title, {fontWeight: '700', color: tintColor}]}>{options[cancelButtonIndex]}</Text>
				</TouchableHighlight>
			)
		} else {
			return null
		}
	}

	_createButton(buttonTitle, fontColor, index, style) {
		const { options } = this.props
		const title = this.props.title
		let titleNode = null
		if (React.isValidElement(buttonTitle)) {
			titleNode = buttonTitle
		} else {
			titleNode = <Text style={[btnStyle.title, {color: fontColor}]}>{buttonTitle}</Text>
		}
		return (
			<TouchableHighlight
				key={index}
				activeOpacity={1}
				underlayColor="#f4f4f4"
				style={[btnStyle.wrapper, style || {},
					index == 1 && title == null ? {borderTopLeftRadius: 4, borderTopRightRadius: 4} : {},
					index == options.length - 1 ? {borderBottomLeftRadius: 4, borderBottomRightRadius: 4} : {}]}
				onPress={this.hide.bind(this, index)}
			>
				{titleNode}
			</TouchableHighlight>
		)
	}

	_renderOptions() {
		let {options, tintColor, cancelButtonIndex, destructiveButtonIndex} = this.props
		return options.map((title, index) => {
			let fontColor = destructiveButtonIndex === index ? WARN_COLOR : tintColor
			return index === cancelButtonIndex ? null : this._createButton(title, fontColor, index)
		})
	}

	render() {
		const { cancelButtonIndex } = this.props
		const { visible, sheetAnim } = this.state
		return (
			<Modal
				visible={visible}
				transparent={true}
				animationType="none"
				onRequestClose={this._cancel}
			>
				<View style={sheetStyle.wrapper}>
					<Text style={styles.overlay} onPress={this._cancel}></Text>
					<Animated.View
						style={[sheetStyle.bd, {height: this.translateY, transform: [{translateY: sheetAnim}]}]}
					>
						{this._renderTitle()}
						{this._renderMessage()}
						{this._renderOptions()}
						{this._renderCancelButton()}
					</Animated.View>
				</View>
			</Modal>
		)
	}
}


ActionSheet.propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
  message: PropTypes.string,
	options: PropTypes.arrayOf((propVal, key, componentName, location, propFullName) => {
		if (typeof propVal[key] !== 'string' && !React.isValidElement(propVal[key])) {
			return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      )
		}
	}),
	tintColor: PropTypes.string,
	cancelButtonIndex: PropTypes.number,
	destructiveButtonIndex: PropTypes.number,
	onPress: PropTypes.func
}


ActionSheet.defaultProps = {
	tintColor: '#007aff',
	onPress: () => {}
}


export default ActionSheet
