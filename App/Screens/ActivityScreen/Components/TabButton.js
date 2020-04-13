import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import * as Ani from 'react-native-animatable'
import EStyleSheet from 'react-native-extended-stylesheet'

import { Fonts, Colors } from 'Themes'

export default class TabButton extends Component {
  render () {
    const { title, onPress, id, current } = this.props
    const active = (id === current)
    return (
      <TouchableOpacity
        style={s.tabButton}
        onPress={() => onPress(id)}>
        <Text style={[
          s.tabText,
          active ? s.tabTextActive : {}
        ]}>
          {title}
        </Text>
        {active
        ? <Ani.View
          animation='flipInX'
          duration={900}
          useNativeDriver
          style={s.triangles}>
          <View style={s.triangle} />
          <View style={[s.triangle, s.triangleB]} />
        </Ani.View> : null}
      </TouchableOpacity>
    )
  }
}

const s = EStyleSheet.create({
  container: {
    flex: 1
  },
  triangles: {
  },
  triangle: {
    position: 'absolute',
    left: '-6%',
    top: '0.9rem',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: '0.5rem',
    borderRightWidth: '0.5rem',
    borderBottomWidth: '0.5rem',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.purplePink,
    zIndex: 9,
    transform: [{ rotate: '180deg' }]
  },
  triangleB: {
    top: '0.9rem-1',
    borderBottomColor: '#f1f1f1',
    zIndex: 10
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '0.9rem'
  },
  tabText: {
    fontFamily: Fonts.type.base,
    color: '#979797',
    fontSize: '1rem',
    textAlign: 'center',
    fontWeight: '500'
  },
  tabTextActive: {
    color: '#111'
  }
})
