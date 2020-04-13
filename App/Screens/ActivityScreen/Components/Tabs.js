/* @flow */

import React, { Component } from 'react'
import { View } from 'react-native'
import { Column as Col, Row } from 'react-native-flexbox-grid'

import TabButton from './TabButton'

import styles from '../ActivityScreen.style'

export default class Tabs extends Component {
  render () {
    const { current, onPress } = this.props
    return (
      <View style={styles.tabs}>
        <Row>
          <Col sm={4}>
            <TabButton
              current={current}
              id={1}
              title={'Active'.toUpperCase()}
              onPress={onPress} />
          </Col>
          <Col sm={4}>
            <TabButton
              current={current}
              id={2}
              title={'New Users'.toUpperCase()}
              onPress={onPress} />
          </Col>
          <Col sm={4}>
            <TabButton
              current={current}
              id={3}
              title={'likes'.toUpperCase()}
              onPress={onPress} />
          </Col>
        </Row>
      </View>
    )
  }
}
