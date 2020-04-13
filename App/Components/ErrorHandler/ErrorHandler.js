import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

import * as Ani from 'react-native-animatable'

import styles from './ErrorHandler.style'

export default class ErrorHandler extends Component {
  renderMessage ({ title, message }) {
    return (
      <View style={styles.container}>
        <Ani.View
          animation='fadeInRight'
          easing='ease-in-out-quint'
          duration={860}
          delay={400}
          style={styles.error}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.messageText}>{message}</Text>
        </Ani.View>
      </View>
    )
  }

  renderProblem () {
    const { problem, message, title } = this.props
    if (problem === 'NETWORK_ERROR' || problem === 'TIMEOUT_ERROR') {
      return this.renderMessage({
        title: title || 'You are offline!',
        message: message || 'Restore network connection.'
      })
    } else if (problem === 'SERVER_ERROR') {
      return this.renderMessage({
        title: title || 'Server error!',
        message: message || 'Try again please.'
      })
    } else {
      return this.renderMessage({
        title: title || 'Something bad happened',
        message: message || 'Try again in a moment.'
      }) 
    }
  }
  render () {
    const { problem } = this.props
    return problem ? this.renderProblem() : <View />
  }
}
