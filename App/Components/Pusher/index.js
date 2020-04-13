import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pusher from './Pusher'
import NotificationActions from 'Redux/NotificationRedux'

import MatchedUsersActions from 'Redux/MatchedUsersRedux'
import DialogsActions from 'Redux/DialogsRedux'
import MessagesActions from 'Redux/MessagesRedux'
import UserActions from 'Redux/UserRedux'

class PusherContainer extends Component {
  render () {
    const { dialogs } = this.props
    const userChatId = dialogs.list[0] && dialogs.list[0].user.id
    return <Pusher {...this.props} userChatId={userChatId} />
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    settings: state.settings,
    pusherReady: state.pusher.ready,
    pusherError: state.pusher.error,
    pusher: state.pusher.pusher,
    notifications: state.notifications,
    dialogs: state.dialogs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    alert: params => dispatch(NotificationActions.alertWithType(params)),
    matchedUsersRequest: params =>
      dispatch(MatchedUsersActions.matchedUsersRequest(params)),
    dialogsRequest: params => dispatch(DialogsActions.dialogsRequest(params)),
    totalsRequest: () => dispatch(DialogsActions.totalsRequest()),
    getMessagesHistory: matchId =>
      dispatch(MessagesActions.messagesHistoryRequest(matchId)),
    setLocation: params => dispatch(UserActions.setLocation(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PusherContainer)
