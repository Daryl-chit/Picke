import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChatScreen from './ChatScreen'

import MessagesActions from 'Redux/MessagesRedux'
import PersonActions from 'Redux/PersonRedux'
import NotificationActions from 'Redux/NotificationRedux'

class ChatScreenContainer extends Component {
  componentWillMount () {
    const { getHistory, getPerson, matchId, userId } = this.props
    getHistory(matchId)
    getPerson(userId)
  }
  render () {
    return <ChatScreen {...this.props} />
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    user: state.user,
    person: state.person,
    unmatchData: state.person.unmatchData,
    reportData: state.person.reportData,
    blockData: state.person.blockData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getHistory: matchId => dispatch(MessagesActions.messagesHistoryRequest(matchId)),
    getPerson: userId => dispatch(PersonActions.personRequest(userId)),
    sendMessage: params => dispatch(MessagesActions.messageSendRequest(params)),
    unmatch: (user_id) => dispatch(PersonActions.unmatchRequest(user_id)),
    report: (user_id, text) => dispatch(PersonActions.reportRequest(user_id, text)),
    block: (user_id) => dispatch(PersonActions.blockRequest(user_id)),
    setCurrent: (props) => dispatch(NotificationActions.setCurrent(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreenContainer)
