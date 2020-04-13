import React, { Component } from 'react'
import {
  Text
} from 'react-native'

import { View } from 'react-native-animatable'
import styles from './Empty.style'

export default class Empty extends Component {
  render () {
    const { text, title } = this.props
    return (
      <View
        animation='fadeInUp'
        duration={800}
        easing='ease-in-out-quint'
        style={styles.component}>
        <Text style={styles.statusText}>{text || title}</Text>
      </View>
    )
  }
}
