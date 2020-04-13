import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './FacebookButton.style'

export default class FacebookButton extends Component {
  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    const { text, style, onPress, textStyle } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={[styles.roundButton, style || {}]}>
        <Text style={[styles.roundButtonText, textStyle]}>{text}</Text>
      </TouchableOpacity>
    )
  }
}
