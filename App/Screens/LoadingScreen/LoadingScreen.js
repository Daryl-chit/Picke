import React, { Component } from 'react'
import {
  View,
  Text,
  LayoutAnimation
} from 'react-native'

import Spinner from 'react-native-spinkit'
import { Colors, calcRem } from 'Themes'

import { random } from 'Tools'

import styles from './LoadingScreen.style'

const spinners = [
  'ChasingDots',
  'Bounce',
  'Pulse'
]

const type = spinners[random(0, spinners.length - 1)]

export default class LoaderOverlay extends Component {
  shouldComponentUpdate () {
    return false
  }
  componentWillUnmount () {
    LayoutAnimation.spring()
  }
  render () {
    return (
      <View style={styles.loaderOverlay}>
        <Spinner
          style={styles.spinner}
          size={calcRem(9)}
          type={type}
          color={Colors.purplePink}
        />
      </View>
    )
  }
}
