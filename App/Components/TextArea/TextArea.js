import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import { Input } from 'Components'
import styles from './TextArea.style'

export default class TextArea extends Component {
  handleChange = (value) => {
    const { field, onChange } = this.props
    if (onChange) onChange(value, field)
  }
  render () {
    const { label, description, field, value, row, style, ...etc } = this.props
    return (
      <View style={[styles.wrap, row ? styles.row : {}, style || {}]}>
        {label ? <Text style={styles.label}>{label.toUpperCase()} {description
          ? <Text style={[styles.label, styles.description]}>({description.toUpperCase()})</Text> : null}
        </Text> : null}

        <AutoGrowingTextInput
          style={[
            style, styles.roundInputPlane, styles.textArea
          ]}
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => this.handleChange(text)}
          underlineColorAndroid='transparent'
          {...etc}
        />
      </View>
    )
  }
}
