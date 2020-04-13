import React from 'react'
import { View } from 'react-native'
// import * as Ani from 'react-native-animatable'
import Image from 'react-native-fast-image'
import Spinner from 'react-native-spinkit'

import { calcRem, Colors, IS_IOS } from 'Themes'
import s from './FastImage.style'

export default class FastImage extends React.Component {
  state = {
    loaded: false,
    error: false
  }
  onLoad = (e) => {
    this.setState({ loaded: true })
  }
  onError = () => {
    this.setState({ error: true, loaded: true })
  }

  renderSpinner () {
    return (
      <View style={s.spinnerContainer}>
        <Spinner
          style={s.spinner}
          size={calcRem(1)}
          type={ IS_IOS ? 'Arc' : 'Circle' }
          color={Colors.purplePink}
        />
      </View>
    )
  }

  render () {
    const { source, resizeMode, ...other } = this.props
    const { loaded } = this.state
    const backgroundColor = !source.uri ? null : 'rgba(0,0,0,0.05)'
    return (
      <View>
        {!loaded && source.uri ? this.renderSpinner() : null }
        <Image
          backgroundColor={backgroundColor}
          source={source}
          resizeMode={resizeMode || Image.resizeMode.contain}
          onLoad={this.onLoad}
          onError={this.onError}
          onProgress={e => (e.nativeEvent.loaded / e.nativeEvent.total)}
          {...other} />
      </View>
    )
  }
}
// <Ani.View ref='container' animation='fadeIn' duration={600}>
