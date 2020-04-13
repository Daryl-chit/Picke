import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

import * as Ani from 'react-native-animatable'

import { BouncyDrawer } from 'Components'
import { Images, calcRem, IS_IOS } from 'Themes'
import { SettingsScreen } from 'Screens'
import { isX } from 'Tools'

import styles from './Drawer.style'

export default class Drawer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.isAnimating = false
  }

  renderContent = () => {
    return (
      <SettingsScreen />
    )
  }

  renderOpenButton = () => {
    return (
      <View style={{ borderWidth: 2 }}>
        <Image
          style={styles.openButton}
          source={Images.menu} />
      </View>
    )
  }

  onToggle = () => {
    const { open } = this.state
    if (!this.isAnimating) {
      if (open) {
        this.refs.drawer.onToggle()
        this.setState({ open: false })
      } else {
        this.refs.drawer.onToggle()
        this.setState({ open: true })
      }
    }
  }

  onOpen = () => {
    this.refs.button.fadeOutLeft(300)
  }

  onClose = () => {
    this.refs.button.fadeInLeft(300)
    this.isAnimating = true
  }

  didClose = () => {
    this.isAnimating = false
  }

  renderMenuButton = () => {
    return (
      <Ani.View
        useNativeDriver
        ref='button'
        animation='zoomIn'
        style={{
          position: 'absolute',
          left: calcRem(1.6),
          top: IS_IOS ? isX ? calcRem(4) : calcRem(2.5) : calcRem(1.5),
          zIndex: 66
        }}>
        <TouchableOpacity
          onPress={this.onToggle}>
          <View>
            <Image
              style={{ width: calcRem(3), height: calcRem(3) }}
              source={Images.menu} />
          </View>
        </TouchableOpacity>
      </Ani.View>
    )
  }

  render () {
    const { open } = this.state
    return (
      <View style={{ zIndex: 66 }}>
        {this.renderMenuButton()}
        <BouncyDrawer
          customOpenButton
          ref='drawer'
          activeOpacity={open ? 1 : 0.8}
          willOpen={() => this.onOpen()}
          didOpen={() => {}}
          willClose={() => this.onClose()}
          didClose={() => this.didClose()}
          defaultCloseButtonIconColor='#000'
          renderContent={this.renderContent}
          openButtonContent={this.renderOpenButton()}
          openFriction={122}
          openTension={50}
          closeBounciness={1111}
          {...this.props}
        />
      </View>
    )
  }
}
