import * as Ani from 'react-native-animatable'

import {
  Actions,
  Avatar,
  Bubble,
  GiftedChat,
  Message,
  Send,
  SystemMessage,
  Time
} from 'react-native-gifted-chat'
import { Colors, Fonts, Images, calcRem } from 'Themes'
import { Image, Platform, Text, View } from 'react-native'

import CustomActions from './CustomActions'
import CustomView from './CustomView'
import MessageBubble from './Components/MessageBubble'
import React from 'react'
import { convertUTCtoLocalFormat } from 'Utils/Time'
import { decodeString } from 'Tools'
import { equals } from 'ramda'
import styles from './Chat.style'

class MessageContainer extends React.Component {
  render () {
    return <Message {...this.props} />
  }
}

export default class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      matchId: props.matchId,
      messages: props.messages.chats ? this.prepareMessages(props.messages.chats) : [],
      typingText: null,
      problems: [],
      sending: false
    }
    this._isMounted = false
    this._isAlright = null
  }

  componentWillMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  componentWillReceiveProps (nextProps) {
    const is = equals(nextProps.messages.history, this.props.messages.history)
    // console.log({ is }, this.state, nextProps)
    if (!is) {
      const messages = this.prepareMessages(nextProps.messages.chats)
      const isAnnounce = (nextProps.messages.history[0].id === '0')
      const firstIndex = isAnnounce ? 1 : 0
      const isEmpty = (this.state.messages.length === 0)
      const isMe = (nextProps.messages.history[firstIndex].user_id === this.props.user.userId)
      const isFirstMessage = isAnnounce ? (nextProps.messages.history.length === 2) : (nextProps.messages.history.length === 1)
      const shouldUpdate = ((!nextProps.messages.history[firstIndex].image && !isMe) || isFirstMessage || isEmpty)

      // console.log({ shouldUpdate, isFirstMessage, isMe, isAnnounce, isEmpty })
      const messageId = nextProps.messages.messageId
      const { problems } = this.state
      let newProblems = problems
      if (messageId && problems) {
        const index = problems.indexOf(messageId)
        if (index >= 0) {
          newProblems.splice(index, 1)
        }
      }

      if (shouldUpdate) {
        this.setState({ messages, sending: false, problems: newProblems })
      } else {
        this.setState({ sending: false, problems: newProblems })
      }
    }
    const isProblem = (!this.props.messages.sendProblem && nextProps.messages.sendProblem)
    if (isProblem) {
      const { problems } = this.state
      let newProblems = problems

      newProblems.push(nextProps.messages.sendProblem.messageId)
      this.setState({ problems: newProblems, sending: false })
    }

  }

  prepareMessages (msgs) {
    const { person, matchId } = this.props
    const { name, photos } = person.item
    const messages = msgs[matchId]
    if (messages && name) {
      const messagesFormat = ({ id, message, created_at, user_id, image }) => {
        const createdAt = convertUTCtoLocalFormat(created_at)
        return ({
          _id: id,
          text: decodeString(message),
          createdAt,
          image,
          user: {
            _id: user_id,
            name: name,
            avatar: photos && photos[0] ? photos[0].path : null
          }
        })
      }
      const list = messages.map(messagesFormat)
      // const sortList = [].concat(list)
      return list
    }
    return []
  }

  sendMessage = ({ message, imgFile, messageId }) => {
    const { sendMessage, matchId } = this.props
    if (message !== '' || imgFile !== '') sendMessage({ message, imgFile, matchId, messageId })
  }

  onSend = (messages = []) => {
    this.setState({ sending: true })
    messages.map(m => {
      let msg = { message: m.text || '', messageId: m._id }
      if (m.image) {
        msg.imgFile = m.image
      }
      this.sendMessage(msg)
    })
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      }
    })
  }

  openUser = () => {
    const {openUserModal} = this.props
    if (openUserModal) {
      openUserModal()
    }
  }

  renderCustomActions = (props) => {
    if (Platform.OS === 'ios') {
      return <CustomActions {...props} />
    }
    const options = {
      'Action 1': props => {
        alert('option 1')
      },
      'Action 2': props => {
        alert('option 2')
      },
      Cancel: () => {}
    }
    return <Actions {...props} options={options} />
  }

  renderBubble = (props) => {
    const { onError } = this.props
    const { problems } = this.state
    return (
      <MessageBubble {...props} problems={problems} onError={onError} />
    )
  }

  renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 14
        }}
      />
    )
  }

  renderCustomView = (props) => {
    return <CustomView {...props} />
  }

  renderFooter = (props) => {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      )
    }
    return null
  }

  renderAvatar = (props) => {
    return (
      <Ani.View
        useNativeDriver
        animation={'zoomInLeft'}
        duration={400}>
        <Avatar
          {...props}
          imageStyle={{
            left: styles.avatar,
            right: styles.avatar
          }}
          onPressAvatar={this.openUser} />
      </Ani.View>
    )
  }

  renderSend = (props) => {
    return (
      <Send {...props}>
        <Ani.View
          useNativeDriver
          animation='fadeInRight'
          duration={600}
          style={styles.sendButton}>
          <Image
            source={Images.plane}
            style={styles.sendIcon} />
        </Ani.View>
      </Send>
    )
  }

  renderMessage = (props) => {
    return (
      <MessageContainer {...props} />
    )
  }

  renderTime = (props) => {
    return (
      <Time
        {...props}
        containerStyle={{
          left: {
            height: calcRem(1.1)
          },
          right: {
            height: calcRem(1.1)
          }
        }}
        textStyle={{
          right: {
            fontFamily: Fonts.type.neue,
            fontSize: calcRem(0.8),
            color: Colors.greyish
          },
          left: {
            fontFamily: Fonts.type.neue,
            fontSize: calcRem(0.8),
            color: '#fff'
          }
        }} />
    )
  }

  renderFooter = () => {
    const { sending } = this.state
    return (
      sending
        ? <Ani.View animation='zoomIn' style={styles.sending}>
          <View style={[styles.bubble, styles.bubbleRight, styles.sendingWrap]}>
            <Text style={styles.sendingText}>Sending...</Text>
          </View>
        </Ani.View>
        : null
    )
  }

  render () {
    const { user } = this.props
    const { messages, problems } = this.state
    return (
      <GiftedChat
        messages={messages}
        onSend={this.onSend}
        isLoadingEarlier={this.state.isLoadingEarlier}
        user={{
          _id: user.userInfo.userId,
          name: user.name,
          avatar: user.photos && user.photos[0] ? user.photos[0].path : null
        }}
        isAnimated
        renderAvatarOnTop
        renderTime={this.renderTime}
        renderAvatar={this.renderAvatar}
        renderSend={this.renderSend}
        renderMessage={this.renderMessage}
        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        // renderFooter={this.renderFooter}
      />
    )
  }
}
