import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Entypo'

import { rem, Colors } from 'Themes'
import styles from './GradientButton.style'

const colors = {
  purple: ['rgb(204,46,194)', 'rgb(220,97,140)'],
  green: ['#03E57D', '#00CB4A'],
  plain: ['#fff', '#fff'],
  grey: ['#e0e0e0', '#e0e0e0']
}

export default class GradientButton extends Component {
  onPress = () => {
    const { onPress, value, field, disabled } = this.props
    if (onPress && !disabled) onPress(value, field)
  }
  render () {
    const { color, buttonStyle, icon, plain, iconColor, style, paddingVertical, gradientStyle, text, textStyle, textColor, borderColor, nonClickable } = this.props
    const currentColor = color && colors[color] ? colors[color] : colors['plain']
    const currentStyle = buttonStyle ? [styles.linearGradient, buttonStyle] : styles.linearGradient

    return (
      <TouchableOpacity
        onPress={this.onPress}
        disabled={nonClickable}
        style={[
          styles.buttonContainer,
          color === 'plain' || plain ? styles.borderButton : {},
          borderColor ? { borderColor } : {},
          style || {}]}>
        <LinearGradient
          colors={currentColor}
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          style={[
            currentStyle,
            { flexDirection: 'row' },
            paddingVertical ? { paddingVertical } : {},
            gradientStyle || {}]}>
          {icon
            ? <Icon
              name={icon}
              style={{ backgroundColor: 'rgba(0,0,0,0)', paddingRight: rem }}
              size={rem * 1.7}
              color={color === 'plain' ? iconColor || Colors.text : '#fff'} />
            : null}
          <Text style={[
            styles.buttonText,
            color === 'plain' || plain ? { color: Colors.text } : {},
            textStyle || {},
            textColor ? { color: textColor } : {}]}>
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}
