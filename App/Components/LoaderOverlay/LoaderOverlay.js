import React, { Component } from 'react'
import { View } from 'react-native'
import Spinner from 'react-native-spinkit'
import { Colors, calcRem, IS_IOS } from 'Themes'
import styles from './LoaderOverlay.style'

export default class LoaderOverlay extends Component {
  render () {
    return (
      <View
        style={styles.loaderOverlay}>
        <Spinner
          style={styles.spinner}
          size={calcRem(9)}
          type={ IS_IOS ? 'Arc' : 'Circle' }
          color={Colors.purplePink}
        />
      </View>
    )
  }
}
