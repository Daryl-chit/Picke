import React, { Component } from 'react'
import { connect } from 'react-redux'
import MessagesScreen from './MessagesScreen'
import LikeActions from 'Redux/LikeRedux'
import DialogsActions from 'Redux/DialogsRedux'
import MatchedUsersActions from 'Redux/MatchedUsersRedux'
import PeopleActions from 'Redux/PeopleRedux'

class MessagesScreenContainer extends Component {
  render () {
    return (
      <MessagesScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    likes: state.likes,
    matchedUsers: state.matchedUsers,
    dialogs: state.dialogs,
    usersWhoLikedList: state.likes.usersWhoLiked,
    dialogsList: state.dialogs.list,
    matchedUsersList: state.matchedUsers.list,
    totals: state.dialogs.totals,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    likedRequest: () => dispatch(LikeActions.likedRequest()),
    dialogsRequest: () => dispatch(DialogsActions.dialogsRequest()),
    matchedUsersRequest: () => dispatch(MatchedUsersActions.matchedUsersRequest()),
    cleanRequest: () => dispatch(PeopleActions.cleanRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreenContainer)
