import React, { Component } from 'react'
import { connect } from 'react-redux'
import TestScreen from './TestScreen'

import MessagesActions from 'Redux/MessagesRedux'
import PersonActions from 'Redux/PersonRedux'

class TestScreenContainer extends Component {
  componentWillMount () {
    
  }
  render () {
    // console.log(this.props)
    return <TestScreen {...this.props} />
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    user: state.user,
    person: state.person,
    dialogs: state.dialogs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getHistory: matchId =>
    //   dispatch(MessagesActions.messagesHistoryRequest(matchId)),
    // getPerson: userId => dispatch(PersonActions.personRequest(userId)),
    // sendMessage: params => dispatch(MessagesActions.messageSendRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScreenContainer)
