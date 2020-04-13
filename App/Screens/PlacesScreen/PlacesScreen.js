import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import { Column as Col, Row } from 'react-native-flexbox-grid'
// import KeyboardSpacer from 'react-native-keyboard-spacer'
// import { Actions } from 'react-native-router-flux'
import { VenuesMap } from 'Components'
// import { Metrics, Fonts, Colors, rem } from 'Themes'

import styles from './PlacesScreen.style'

export default class PlacesScreen extends Component {
  render () {
    const { venues } = this.props
    return (
      <View style={styles.screen}>
        <VenuesMap venues={venues.list} />
      </View>
    )
  }
}
