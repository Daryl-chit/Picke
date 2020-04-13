import React, { Component } from 'react'
import { View } from 'react-native'

import FastImage from 'react-native-fast-image'

import { Images } from 'Themes'
import styles from './Image.style'

export default class Image extends Component {
  state = {
    progress: null,
    loading: true,
    error: false
  }
  onSuccess = () => {
    this.setState({
      progress: null,
      loading: false,
      error: false
    })
  }
  onError = () => {
    this.setState({
      progress: null,
      loading: false,
      error: true
    })
  }
  onStart = () => {
    this.setState({
      progress: null,
      loading: true,
      error: false
    })
  }
  onProgress = e => this.setState({ progress: e.nativeEvent.loaded / e.nativeEvent.total })
  render () {
    const { containerStyle, style, name, source, ...etc } = this.props
    const { progress, loading, error } = this.state
    // console.log('Image', progress, loading, error)
    return (
      <View style={[styles.container, containerStyle || {}]}>
        <FastImage
          style={[styles.image, style || {}]}
          source={name ? Images[name] : source}
          resizeMode={FastImage.resizeMode.contain}
          onLoadStart={this.onStart}
          onProgress={this.onProgress}
          onLoad={this.onSuccess}
          onError={this.onError}
          {...etc} />
      </View>
    )
  }
}
