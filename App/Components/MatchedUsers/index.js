import React, { Component } from 'react'
import { connect } from 'react-redux'
import MatchedUsers from './MatchedUsers'
import MatchedUsersActions from 'Redux/MatchedUsersRedux'

class MatchedUsersContainer extends Component {
  componentWillMount () {
    this.props.getMatchedUsers(0)
  }
  render () {
    return (
      <MatchedUsers {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    matchedUsers: state.matchedUsers,
    loading: state.matchedUsers.fetching,
    list: state.matchedUsers.list,
    offset: state.matchedUsers.offset,
    loaded: state.matchedUsers.loaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMatchedUsers: (offset) => dispatch(MatchedUsersActions.matchedUsersRequest(offset))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchedUsersContainer)
