import React, { Component } from 'react'
import { Button, Linking, StyleSheet, Text, View } from 'react-native'

import DeepLinking from 'react-native-deep-linking'

export default class DeepLinkingComponent extends Component {
  state = {
    response: {}
  }

  componentDidMount () {
    DeepLinking.addScheme('intelaxy-picke://')
    Linking.addEventListener('url', this.handleUrl)

    DeepLinking.addRoute('/instagram/:token', (response) => {
      // example://test
      this.setState('instagram deep', { response })
    })

    Linking.getInitialURL().then((url) => {
      if (url) {
        Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred', err))
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handleUrl)
  }

  handleUrl = ({ url }) => {
    // console.log('handleUrl', { url })
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url)
      }
    })
  }

  render () {
    return (
      <View />
    )
  }
}
