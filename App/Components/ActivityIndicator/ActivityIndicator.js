import React, { Component } from 'react'
import {
  View,
  ActivityIndicator
} from 'react-native'

import { Colors } from 'Themes'
import styles from './ActivityIndicator.style'

export default class ActivityIndicatorComponent extends Component {
  render () {
    const { height, fullHeight } = this.props
    return (
      <View style={[
        styles.activityIndicator,
        height ? { height } : {},
        fullHeight ? styles.fullHeight : {}
      ]}>
        <ActivityIndicator
          size='large'
          animating
          color={Colors.purplePink} />
      </View>
    )
  }
}
