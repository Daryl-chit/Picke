import React, { Component } from 'react'
import {
  View,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'

import color from 'color'
import * as Ani from 'react-native-animatable'
import Spinner from 'react-native-spinkit'
// import FastImage from 'react-native-fast-image'
// import { FastImage as Image } from 'Components'
import { width as screenWidth, Colors, rem, calcRem, calcWidth, Images, IS_IOS } from 'Themes'

import styles from './ImageSlider.style'

export default class ImageSlider extends Component {
  state = {
    current: 1
  }
  constructor (props) {
    super(props)
    const { slideWidth, images } = props
    this.barMargin = 3
    this.barWidth = (slideWidth * images.length) - (this.barMargin * (images.length - 1))
    this.state = {
      current: 1,
      width: null,
      height: null
    }
  }

  renderSlide (data) {
    const { item, index } = data
    const { slideWidth } = this.props
    return (
      <View
        key={'slide:' + index}
        style={[styles.slideItem, { width: calcWidth(0.96) }]}>
        <View style={styles.spinnerContainer}>
          <Spinner
            style={styles.spinner}
            size={calcRem(1)}
            type={ IS_IOS ? 'Arc' : 'Circle' }
            color={Colors.purplePink}
          />
        </View>
        <Image
          source={{
            uri: item
          }}
          resizeMode='cover'
          style={styles.slideImage} />
      </View>
    )
  }

  prevImage = () => {
    const { current } = this.state
    const { slider } = this.refs
    const next = current - 1
    if (current > 1) {
      slider.scrollToIndex({ index: next - 1 })
      this.setState({ current: next })
    }
  }

  nextImage = () => {
    const { current } = this.state
    const { images } = this.props
    const { slider } = this.refs
    const next = current + 1
    if (current < images.length) {
      slider.scrollToIndex({ index: next - 1 })
      this.setState({ current: next })
    }
  }

  renderBar (index) {
    const { slideWidth, images, inactiveBarColor } = this.props
    const { current, width } = this.state
    const isCurrent = (index === current - 1)
    const barMargin = 2

    // TODO: Fix this:

    let wtf = 0

    if (images.length === 1) {
      wtf = 24
    } else if (images.length === 2) {
      wtf = 13
    } else if (images.length === 3) {
      wtf = 7
    } else if (images.length === 4) {
      wtf = 3
    } else if (images.length == 6) {
      wtf = -3
    }

    const barWidth = width ? (width / images.length) - ((barMargin) * (images.length)) - wtf : null

    const barOptions = {
      width: barWidth,
      marginHorizontal: barMargin,
      backgroundColor: images.length === 1 ? color(Colors.purplePink) : isCurrent ? color(Colors.purplePink) : color(Colors.white).alpha(0.71)
    }
    return (
      <View
        key={`bar${index}`}
        style={[
          styles.barItem,
          barOptions
        ]} />
    )
  }

  onCenterPress = () => {
    const { images, onCenterPress } = this.props
    const { current } = this.state
    const index = current - 1
    onCenterPress(index)
  }

  render () {
    const { images, barBottomOffset, onCenterPress, style } = this.props
    const { width } = this.state
    return (
      <View style={style || { flex: 1 }} onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout
        this.setState({ width, height })
      }}>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={this.prevImage}
            style={[styles.controlButton, onCenterPress ? styles.three : {}]} />
          {onCenterPress
            ? <TouchableOpacity
              onPress={this.onCenterPress}
              style={[styles.controlButton, onCenterPress ? styles.three : {}]} /> : null}
          <TouchableOpacity
            onPress={this.nextImage}
            style={[styles.controlButton, onCenterPress ? styles.three : {}]} />
        </View>
        <FlatList
          ref='slider'
          data={images}
          horizontal
          keyExtractor={(item, index) => item}
          renderItem={(item) => this.renderSlide(item)} />
        <Ani.Image
          useNativeDriver
          duration={700}
          animation='fadeIn'
          delay={100}
          resizeMode='stretch'
          source={Images.fadeGradient}
          style={styles.fadeGradient} />
        <View style={[styles.bar, barBottomOffset ? { bottom: barBottomOffset } : {}]}>
          {images.map((e, i) => this.renderBar(i))}
        </View>
      </View>
    )
  }
}
