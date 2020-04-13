import React, { Component } from 'react'
import { Animated, View, Image, ScrollView, TouchableOpacity } from 'react-native'

import { Column as Col, Row } from 'react-native-flexbox-grid'

import { width, height, rem } from 'Themes'

import styles from './PhotoSlider.style'

const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

export default class PhotoSlider extends Component {
  constructor (props) {
    super(props)
    const { images } = props
    this.numItems = images.length
    this.itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
    this.animVal = new Animated.Value(0)
    this.itemsLength = images.length
    this.state = {
      offsets: [],
      current: 1,
      width: null
    }
  }

  nextImage = () => {
    const { parentWidth } = this.props
    const { offsets, current, width } = this.state
    const trueWidth = parentWidth || width
    const next = current + 1
    const x = trueWidth * current
    if (current < this.itemsLength) {
      this.refs.scroll.scrollTo({ x })
      this.setState({ current: next })
    }
  }

  prevImage = () => {
    const { parentWidth } = this.props
    const { offsets, current, width } = this.state
    const trueWidth = parentWidth || width
    const next = current - 1
    const x = (trueWidth * next) - trueWidth
    if (next > 0) {
      this.refs.scroll.scrollTo({ x })
      this.setState({ current: next })
    }
  }

  render () {
    const { images, parentWidth } = this.props
    const barSpaceWidth = 5
    const barWidth = this.numItems > 0 ? (parentWidth / this.numItems) - (barSpaceWidth * (this.numItems - 1)) - 20 : 0

    // TODO: something wrong with barWidth formula;

    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          style={{ width: parentWidth }}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [parentWidth * (i - 1), parentWidth * (i + 1)],
        outputRange: [-barWidth, barWidth],
        extrapolate: 'clamp'
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track, {
              width: barWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE
            }
          ]}>
          <Animated.View
            style={[
              styles.bar, {
                width: barWidth,
                transform: [
                  { translateX: scrollBarVal }
                ]
              }
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <View
        style={styles.container}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout
          this.width = width
          this.setState({ width })
        }}
        flex={1}>
        <View style={styles.controlButtons}>
          <TouchableOpacity onPress={this.prevImage} style={styles.controlButton} />
          <TouchableOpacity onPress={this.nextImage} style={styles.controlButton} />
        </View>
        <ScrollView
          ref='scroll'
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }>
          {imageArray}
        </ScrollView>
        <View
          style={styles.barContainer}>
          {barArray}
        </View>
      </View>
    )
  }
}
