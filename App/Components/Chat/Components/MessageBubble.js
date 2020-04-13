import React from 'react'
import { Image, View, TouchableOpacity } from 'react-native'

import { Bubble } from 'react-native-gifted-chat'
import * as Ani from 'react-native-animatable'
import { Images } from 'Themes'

import styles from '../Chat.style'

export default class MessageBubble extends React.PureComponent {

  onActionsPress = () => {
    const { currentMessage, onError } = this.props
    if (onError) {
      onError(currentMessage)
    }
  }

  render () {
    const { position, currentMessage, problems } = this.props

    const isProblem = problems.includes(currentMessage._id)

    return (
      <Ani.View
        useNativeDriver
        animation={position === 'left' ? 'fadeInLeft' : 'fadeInRight'}
        duration={350}
        delay={180}
        style={[
          styles.bubbleContainer,
          position === 'right' ? styles.bubbleContainerRight : {}
        ]}>
        {position === 'right'
        ? <Image
          source={Images.chatRight}
          style={[styles.corner, styles.cornerRight, isProblem ? { right: 20 } : {}]} />
        : <Image
          source={Images.chatLeft}
          style={[styles.corner, styles.cornerLeft]} />}
        <Bubble
          {...this.props}
          textStyle={{
            left: [styles.messageText, styles.messageTextLeft],
            right: [styles.messageText, styles.messageTextRight]
          }}
          wrapperStyle={{
            left: [styles.bubble, styles.bubbleLeft, isProblem ? { borderBottomWidth: 3, borderBottomColor: 'red' } : {}],
            right: [styles.bubble, styles.bubbleRight, isProblem ? { right: 30 } : {}]
          }}
        />
        {isProblem && position === 'right'
        ? <TouchableOpacity
            style={styles.sendErrorContainer}
            onPress={this.onActionsPress}>
            <Image
              source={Images.sendError}
              style={styles.sendErrorIcon} />
          </TouchableOpacity>
        : null}
      </Ani.View>
    )
  }
}
