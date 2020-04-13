import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewMatchScreen from './ViewMatchScreen'

import PersonActions from 'Redux/PersonRedux'
import MatchedUsersActions from 'Redux/MatchedUsersRedux'
import MessagesActions from 'Redux/MessagesRedux'

class ViewMatchScreenContainer extends Component {
  render () {
    return (
      <ViewMatchScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    person: state.person
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPerson: (userId) => dispatch(PersonActions.personRequest(userId)),
    markAsViewed: (matchId) => dispatch(MatchedUsersActions.markAsViewed(matchId)),
    messagesHistoryRequest: (userId) => dispatch(MessagesActions.messagesHistoryRequest(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMatchScreenContainer)
