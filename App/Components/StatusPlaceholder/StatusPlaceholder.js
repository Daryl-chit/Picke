import React, { Component } from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'

import { Button } from 'Components'
import { calcHeight } from 'Themes'
import styles from './StatusPlaceholder.style'

export default class StatusPlaceholder extends Component {
  render () {
    const { buttonText, onButtonPress, style, textStyle, heightRatio } = this.props
    return (
      <View style={[styles.component, style || {}, { height: calcHeight(0.8 || heightRatio) }]}>
        <Text style={[styles.statusText, textStyle || {}]}>{this.props.title}</Text>
        {buttonText
          ? <View style={styles.buttonContainer}>
            <Button
              text='Refresh'
              onPress={onButtonPress} />
          </View> : null}
      </View>
    )
  }
}
