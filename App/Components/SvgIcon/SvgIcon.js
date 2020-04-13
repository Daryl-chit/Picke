import React, { Component } from 'react'
import {
  View
} from 'react-native'

import SvgUri from 'react-native-svg-uri'

import { Icons } from 'Themes'

import styles from './SvgIcon.style'

export default class SvgIcon extends Component {
  render () {
    const { name, style, ...etc } = this.props
    return (
      <View style={[styles.container, style || {}]}>
        <SvgUri
          source={Icons[name]} {...etc} />
      </View>
    )
  }
}
