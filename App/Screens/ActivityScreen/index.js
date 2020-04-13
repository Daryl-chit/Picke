import React, { Component } from 'react'
import { connect } from 'react-redux'
import ActivityScreen from './ActivityScreen'
import UserActions from 'Redux/UserRedux'
import UsersActions from 'Redux/UsersRedux'

class ActivityScreenContainer extends Component {
  componentWillMount () {
    // const { usersRequest } = this.props
    // usersRequest()
    this.props.newUsersRequest()
  }
  render () {
    return (
      <ActivityScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    likes: state.likes,
    liked: state.likes.usersWhoLiked,
    people: state.people,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // usersRequest: () => dispatch(UsersActions.usersRequest())
    activeUsersRequest: () => dispatch(UsersActions.activeUsersRequest()),
    newUsersRequest: () => dispatch(UsersActions.newUsersRequest()),
    filterUsersRequest: () => dispatch(UsersActions.filterUsersRequest()),
    showUser: () => dispatch(UserActions.showRequest()),
    subscriptionRequest: (params) => dispatch(UserActions.subscriptionRequest(params)),
    subscriptionLog: (data) => dispatch({ type: 'SUBSRIPTION_LOG_REQUEST', data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreenContainer)
