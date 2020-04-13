
import React, { Component } from 'react'
import { connect } from 'react-redux'

import MessageInput from './MessageInput'

import MessagesActions from 'Redux/MessagesRedux'

class MessageInputContainer extends Component {
  render () {
    return <MessageInput {...this.props} />
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: params => dispatch(MessagesActions.messageSendRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageInputContainer)
