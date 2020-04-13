import React, { Component } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './RoundButton.style'

export default class RoundButton extends Component {
  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }
  render () {
    const { text, style, onPress, textStyle, photos } = this.props
    return (
      <View>
        {photos && photos.length <= 5
          ? <TouchableOpacity
            onPress={onPress}
            style={[styles.roundButton, style || {}]}>
            <Text style={[styles.roundButtonText, textStyle]}>{text}</Text>
          </TouchableOpacity>
          : !photos
            ? <TouchableOpacity
              onPress={onPress}
              style={[styles.roundButton, style || {}]}>
              <Text style={[styles.roundButtonText, textStyle || {}]}>
                {text}
              </Text>
            </TouchableOpacity>
            : <View style={[styles.roundButton, style || {}]}>
              <Text style={[styles.roundButtonText, textStyle || {}]}>
                {text}
              </Text>
            </View>}
      </View>
    )
  }
}
