import React, { Component } from 'react'
import {
  View
} from 'react-native'

// import { View } from 'react-native-animatable'
import { calcRem, Colors, calcHeight } from 'Themes'
// import { random } from 'Tools'

import Spinner from 'react-native-spinkit'
import styles from './AnimatedLoader.style'

export default class AnimatedLoader extends Component {
  render () {
    const { height, fullHeight, heightRatio } = this.props
    return (
      <View style={[
        styles.animatedLoader,
        height ? { height } : {},
        fullHeight ? styles.fullHeight : {},
        heightRatio ? { height: calcHeight(heightRatio) } : null
      ]}>
        <Spinner
          style={styles.spinner}
          size={calcRem(10)}
          type={'ThreeBounce'}
          color={Colors.purplePink}
        />
      </View>
    )
  }
}
