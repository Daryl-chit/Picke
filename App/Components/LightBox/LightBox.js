import React, { Component } from 'react'
import {
  View,
  Image
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import Lightbox from 'react-native-lightbox'

import styles from './LightBox.style'

export default class LightBox extends Component {
  render () {
    const { images, ...etc } = this.props
    return (
      <Lightbox
       {...etc}
        navigator={navigator}>
        {/* {images.map(uri => {
          return (
            <Image source={{ uri }} style={s.image} />
          )
        })}         */}
      </Lightbox>
    )
  }
}

const s = EStyleSheet.create({
  image: {
    height: 500
  }
})
