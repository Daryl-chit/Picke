import React, { Component } from 'react'
import {
  View,
  Text,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native'

import * as Ani from 'react-native-animatable'

import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors, Fonts } from 'Themes'

export default class Expander extends Component {
  render () {
    const { active, children, title, onPress, rightText } = this.props
    return (
      <View style={[s.container, active ? { flex: 1 } : {}]}>
        <TouchableOpacity style={s.title} onPress={onPress}>
          <Text style={[s.titleText, active ? s.titleActive : {}]}>{title}</Text>
          {rightText ? <Text style={s.rightText}>{rightText}</Text> : null}
        </TouchableOpacity>
        {active
          ? <Ani.View
            animation='fadeInRight'
            duration={690}
            useNativeDriver
            easing='ease-in-out-quart'
            style={s.content}>{children}</Ani.View> : null}
      </View>
    )
  }
}

const s = EStyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 1,
    marginBottom: '0.5rem'
  },
  title: {
    borderRadius: 6,
    backgroundColor: '#ffffff',
    paddingVertical: '0.7rem',
    paddingHorizontal: '1rem',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  titleText: {
    fontFamily: Fonts.type.base,
    fontWeight: '500',
    color: Colors.purplePink,
    fontSize: '1rem'
  },
  rightText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: '#000',
    position: 'absolute',
    right: '1rem',
    top: '0.7rem',
    fontSize: '1rem'
  },
  titleActive: {
    color: '#000'
  },
  content: {
    flex: 1,
    paddingVertical: '0.6rem',
    paddingHorizontal: '1rem'
  }
})
