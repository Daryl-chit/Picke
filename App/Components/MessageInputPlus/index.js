
import React, { Component } from 'react'
import { connect } from 'react-redux'

import MessageInputPlus from './MessageInputPlus'

import MessagesActions from 'Redux/MessagesRedux'
import SettingsActions from 'Redux/SettingsRedux'

class MessageInputPlusContainer extends Component {
  render () {
    return <MessageInputPlus {...this.props} />
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: params => dispatch(MessagesActions.messageSendPlusRequest(params)),
    editSettings: (params) => dispatch(SettingsActions.editSettings(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageInputPlusContainer)
