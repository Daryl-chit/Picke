import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import { Actions } from 'react-native-router-flux'

import { Row, Column as Col } from 'react-native-flexbox-grid'
import Icon from 'react-native-vector-icons/Ionicons'

import { Colors, rem, Metrics } from 'Themes'

import ProgressLine from 'Components/ProgressLine'
import styles from './Header.style'

const BackIcon = () => (
  <Icon
    name='ios-arrow-dropleft-outline'
    size={1.6 * rem}
    color={Colors.purplePink} />
)

export default class Header extends Component {
  render () {
    const { title, afterTitle, right, backgroundColor, rightIcon, onRight, progress, noBorder, left, current, onBack, transparent, style, stepInfo } = this.props
    return (
      <View style={[
        styles.header,
        progress || noBorder ? { borderBottomWidth: 0 } : {},
        transparent ? { backgroundColor: 'transparent' } : {},
        backgroundColor ? { backgroundColor: backgroundColor } : {},
        style || {}
      ]}>
        <Row>
          <Col sm={2} style={styles.alignLeft}>
            {left || <TouchableOpacity
              style={styles.touchable}
              onPress={() => onBack ? onBack() : Actions.pop()}>
              <BackIcon />
            </TouchableOpacity>}
          </Col>
          <Col sm={8} style={styles.wrap}>
            <View style={styles.title}>
              {title ? <Text style={styles.titleText}>{title.toUpperCase()}</Text> : null}
              {afterTitle}
            </View>
          </Col>
          <Col sm={2} style={[styles.wrap, styles.alignRight]}>
            {rightIcon && onRight
              ? <TouchableOpacity
                style={styles.touchable}
                onPress={onRight}>
                {rightIcon}
              </TouchableOpacity> : right}
            {stepInfo ? <Text style={styles.rightText}>{stepInfo}</Text> : null}
          </Col>
        </Row>
        {progress ? <ProgressLine
          steps={progress}
          current={current}
          style={styles.progress} /> : null}
      </View>
    )
  }
}
