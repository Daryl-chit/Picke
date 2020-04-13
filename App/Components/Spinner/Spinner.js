import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import { View } from 'react-native-animatable'
import SpinKit from 'react-native-spinkit'
import { Colors, calcRem, IS_IOS } from 'Themes'
import styles from './Spinner.style'

export default class Spinner extends Component {
  render () {
    const { size, animation, easing, containerStyle, style, other } = this.props
    return (
      <View
        useNativeDriver
        duration={600}
        animation={animation || 'zoomIn'}
        easing={easing || 'ease-in-out-quint'}
        style={[styles.container, containerStyle || {}]}>
        <SpinKit
          style={[styles.spinner, style || {}]}
          size={size || calcRem(11)}
          type={ IS_IOS ? 'ArcAlt' : 'Bounce' }
          color={Colors.purplePink}
          {...other}
        />
      </View>
    )
  }
}
