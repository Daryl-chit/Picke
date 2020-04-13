import React, { Component } from 'react'
import {
  TextInput,
  View
} from 'react-native'

import { Colors } from 'Themes'

import styles from './Input.style'

export default class Input extends Component {
  handleChange (value) {
    const { field, onChange } = this.props
    if (onChange) onChange(value, field)
  }
  onBlur (value) {
    const { field, onBlur } = this.props
    if (onBlur) onBlur(value, field)
  }
  render () {
    const { onSubmit, style, containerStyle, type, ...etc } = this.props
    return (
      <View style={[
        containerStyle,
        type ? styles[`${type}Container`] : {}
      ]}>
        <TextInput
          style={[
            style,
            type ? styles[type] : {},
            etc.multiline ? styles.textArea : {}
          ]}
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          onBlur={text => this.onBlur(text)}
          onChangeText={text => this.handleChange(text)}
          underlineColorAndroid='transparent'
          placeholderTextColor={Colors.pinkishGray}
          {...etc}
        />
      </View>
    )
  }
}
