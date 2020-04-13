import React, { Component } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  LayoutAnimation
} from 'react-native'

import * as Ani from 'react-native-animatable'

import { LayoutMixed, LayoutSpring, ExpandSpring, EaseOpacity } from 'Animations/LayoutAnimation'
import { Images } from 'Themes'

import styles from './MessageInputPlus.style'

export default class MessageInputPlus extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      isOpen: false
    }
  }

  handleChange (text) {
    this.setState({ message: text })
  }

  sendMessage () {
    const { sendMessage, editSettings, settings, userId, name, closeModal } = this.props
    const { message } = this.state
    if (message && message.trim() != '') {
      // console.log('sendMessage', { message, userId, name })
      sendMessage({
        message,
        userId,
        name
      })
      const { excludeUsers } = settings
      let newExcludeUsers = Object.assign([], excludeUsers ? excludeUsers : [])
      if (newExcludeUsers.indexOf(userId) < 0) {
        newExcludeUsers.push(userId)
        editSettings({ excludeUsers: newExcludeUsers })
      }

      if (closeModal) {
        closeModal()
      }
    }

  }

  toggleVisibility = () => {
    const { isOpen } = this.state
    LayoutAnimation.configureNext(LayoutSpring)
    if (isOpen) {
      this.sendMessage()
    }
    this.setState({ isOpen: !isOpen, message: '' })
  }

  renderIconButton () {
    return (
      <TouchableOpacity
        style={styles.iconButton}
        onPress={this.toggleVisibility}>
        <Image
          resizeMode='contain'
          source={Images.messagePlus}
          style={styles.messageIcon} />
      </TouchableOpacity>
    )
  }

  renderSendButton () {
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={this.toggleVisibility}>
        <Ani.View
          animation={'zoomIn'}
          easing={'ease-in-out-quart'}
          delay={400}
          duration={800}>
          <Image
            source={Images.plane}
            style={[styles.sendIcon]} />
          </Ani.View>
      </TouchableOpacity>
    )
  }

  render () {
    const { style, userId } = this.props
    const { message, isOpen } = this.state
    return (
      <View style={[styles.container, style || {}, isOpen ? styles.open : {}]}>
        {isOpen
        ? <View style={styles.input}>
          <TextInput
            ref='input'
            style={styles.textInput}
            returnKeyType='next'
            autoCapitalize='none'
            onBlur={() => this.toggleVisibility()}
            placeholder={'Enter your message...'}
            autoCorrect={false}
            value={message}
            onChangeText={text => this.handleChange(text)}
            underlineColorAndroid='transparent'
            placeholderTextColor={'#666'} />
        </View> : null}
        {isOpen ? this.renderSendButton() : this.renderIconButton()}
      </View>
    )
  }
}
