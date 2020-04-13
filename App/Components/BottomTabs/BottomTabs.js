import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

import * as Ani from 'react-native-animatable'
import { Column as Col, Row } from 'react-native-flexbox-grid'
import { Images, calcRem } from 'Themes'

import styles from './BottomTabs.style'

export default class BottomTabs extends Component {
  render () {
    const { active, onPress, style, totals } = this.props
    const messagesTotal = totals && totals.unread_messages
    ? totals.unread_messages : null
    return (
      <View style={[styles.bottomBarContainer, style || {}]}>
        <View style={styles.bottomBar}>
          <Row>
            <Col sm={3} style={styles.barCell}>
              <TouchableOpacity onPress={() => onPress(1)} style={styles.barButton}>
                <Image
                  source={Images.panelIcons[`activity${active === 1 ? 'Active' : ''}`]}
                  style={[styles.barIcon, { width: calcRem(1.2) }]} />
              </TouchableOpacity>
            </Col>
            <Col sm={3} style={styles.barCell}>
              <TouchableOpacity onPress={() => onPress(2)} style={styles.barButton}>
                <Image
                  source={Images.panelIcons[`user${active === 2 ? 'Active' : ''}`]}
                  style={[styles.barIcon, { width: calcRem(1.5) }]} />
              </TouchableOpacity>
            </Col>
            <Col sm={3} style={styles.barCell}>
              <TouchableOpacity
                onPress={() => onPress(3)}
                style={[styles.barButton]}>
                <Image
                  source={Images.panelIcons[`spots${active === 3 ? 'Active' : ''}`]}
                  style={[styles.barIcon, { width: calcRem(1.9), marginTop: -(calcRem(0.35)) }]} />
              </TouchableOpacity>
            </Col>
            <Col sm={3} style={styles.barCell}>
              <TouchableOpacity onPress={() => onPress(4)} style={styles.barButton}>
                <Image
                  source={Images.panelIcons[`contact${active === 4 ? 'Active' : ''}`]}
                  style={[styles.barIcon, { width: calcRem(1.7) }]} />
                {messagesTotal
                ? <Ani.View
                  useNativeDriver
                  easing='ease-in-out-circ'
                  animation='zoomIn'
                  style={styles.messagesCount}>
                  <Text style={styles.messagesCountText}>{messagesTotal}</Text>
                </Ani.View> : null}
              </TouchableOpacity>
            </Col>
          </Row>
        </View>
      </View>
    )
  }
}
