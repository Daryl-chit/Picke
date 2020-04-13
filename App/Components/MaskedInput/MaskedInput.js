import React, { Component } from 'react'
import {
  View
} from 'react-native'

import { TextInputMask } from 'react-native-masked-text'
import { Colors } from 'Themes'

export default class MaskedInput extends Component {
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
      <View style={containerStyle}>
        <TextInputMask
          type={type}
          options={type === 'datetime' ? {
            format: 'DD / MM / YYYY'
          } : null}
          style={style}
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          onBlur={text => this.onBlur(text)}
          onChangeText={text => this.handleChange(text)}
          underlineColorAndroid='transparent'
          placeholderTextColor={Colors.pinkishGray}
          {...etc} />
      </View>
    )
  }
}
