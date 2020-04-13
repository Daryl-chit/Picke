import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity
} from 'react-native'

import styles from './Button.style'

export default class Button extends Component {
  render () {
    const { onPress, text, style, textStyle } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.buttonContainer, style || {}]}>
        <Text style={[styles.buttonText, textStyle || {}]}>{text.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}
