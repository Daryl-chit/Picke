import React, { Component } from 'react'
import {
  View
} from 'react-native'

import styles from './Pager.style'

import Carousel from 'react-native-snap-carousel'

import { width, height } from 'Themes'

export default class Pager extends Component {
  renderItem ({item, index}) {
    return (
      <View style={{ flex: 1 }}>{item}</View>
    )
  }
  next () {
    this.carousel.snapToNext(true)
  }
  prev () {
    this.carousel.snapToPrev(true)
  }
  render () {
    const { data, ...etc } = this.props
    return (
      <Carousel
        data={data}
        renderItem={this.renderItem}
        sliderWidth={width}
        itemWidth={width}
        ref={c => { this.carousel = c }}
        slideStyle={{ width: width }}
        inactiveSlideOpacity={1}
        lockScrollWhileSnapping
        scrollEnabled={false}
        inactiveSlideScale={1}
        activeSlideOffset={0}
        enableSnap={false}
        {...etc}
      />
    )
  }
}
