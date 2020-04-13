import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native'

import * as Ani from 'react-native-animatable'
import EStyleSheet from 'react-native-extended-stylesheet'

import { Button, UserInstagram } from 'Components'
import { Fonts, Colors, Images } from 'Themes'

import { LayoutSpring } from 'Animations/LayoutAnimation'
import { decodeString, getInstagramPhotos } from 'Tools'

export default class UserMore extends Component {
  onPress = () => {
    const { showAction } = this.props
    if (showAction) {
      showAction()
    }
  }

  componentWillUpdate () {
    LayoutAnimation.configureNext(LayoutSpring)
  }

  hide = () => {
    this.refs.view.fadeOutDown(600)
  }

  renderAboutSection = () => {
    const { user } = this.props
    return (
      <View style={s.section}>
        <Text style={s.titleText}>About</Text>
        <Text style={s.aboutText}>{decodeString(user.about)}</Text>
      </View>
    )
  }

  renderFooterSection = (isNotAlone) => {
    return (
      <View style={[ s.footer, isNotAlone ? s.footerPadding : null ]}>
        <Button
          style={s.button}
          text={'Block User & Report'.toUpperCase()}
          onPress={this.onPress}
        />
      </View>
    )
  }

  renderUpButton = () => {
    return (
      <TouchableOpacity
        style={s.upArrowIcon}
        onPress={this.close}>
        <Ani.View
          ref='up'
          animation='zoomInUp'
          useNativeDriver>
          <Image
            source={Images.upArrow}
            style={s.icon} />
        </Ani.View>
      </TouchableOpacity>
    )
  }

  close = () => {
    const { onBottomPress } = this.props
    this.refs.up.fadeOutDown(300)
    this.refs.view.fadeOutUp(500)
    onBottomPress()
  }

  render () {
    const { user, upArrowHidden } = this.props
    const { photos, instagram_user, privateInstagram } = user
    const hasInstagram = (instagram_user !== null)
    const aboutNotEmpty = user && user.about
    const instagramPhotos = hasInstagram && getInstagramPhotos(photos)
    const instagramUser = user && user.instagram_user
    const isInstagram = (user && user.instagram_user && instagramPhotos.length > 0)

    return (
      <Ani.View
        ref='view'
        style={[s.component, upArrowHidden ? {zIndex: 1} : {}]}
        animation='fadeInUp'
        useNativeDriver
        easing='ease-in-out-quint'>
        {user && user.about ? this.renderAboutSection() : null}
        {isInstagram
          ? <UserInstagram
            photos={instagramPhotos}
            isPrivateInstagram={privateInstagram}
            username={instagramUser} /> : null}
        {this.renderFooterSection(aboutNotEmpty || hasInstagram)}
        {upArrowHidden
          ? null
          : this.renderUpButton()}
      </Ani.View>
    )
  }
}

const s = EStyleSheet.create({
  component: {
    backgroundColor: '#fff',
    paddingTop: '1.5rem',
    paddingBottom: '1rem',
    paddingHorizontal: '0rem',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: '#999',
    position: 'relative',
    zIndex: 10
  },
  section: {
    paddingBottom: '1rem',
    paddingHorizontal: '1rem',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0'
  },
  button: {
  },
  footer: {
    marginTop: '0rem',
    paddingHorizontal: '1rem',
    backgroundColor: 'transparent'
  },
  footerPadding: {
    paddingTop: '1rem'
  },
  titleText: {
    fontFamily: Fonts.type.base,
    fontSize: '1.45rem',
    marginBottom: '0.3rem',
    color: '#000'
  },
  aboutText: {
    fontFamily: Fonts.type.neue,
    fontSize: '1rem',
    lineHeight: '1.4rem',
    paddingRight: '1.2rem',
    fontWeight: '400',
    color: '#6c6c6c'
  },
  upArrowIcon: {
    position: 'absolute',
    top: '-1rem',
    right: '1.2rem',
    width: '2rem',
    height: '2rem',
    zIndex: 999
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})
