import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserActions from 'Redux/UserRedux'
import UserCard from './UserCard'

class UserCardContainer extends Component {
  render () {
    return (
      <UserCard {...this.props} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscriptionRequest: (params) => dispatch(UserActions.subscriptionRequest(params)),
    subscriptionLog: (data) => dispatch({ type: 'SUBSRIPTION_LOG_REQUEST', data })
  }
}

export default connect(null, mapDispatchToProps)(UserCardContainer)
