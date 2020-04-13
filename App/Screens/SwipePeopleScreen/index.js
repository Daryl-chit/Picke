import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipePeopleScreen from './SwipePeopleScreen'
import UserActions from 'Redux/UserRedux'

class SwipePeopleScreenContainer extends Component {
  render () {
    return (
      <SwipePeopleScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    people: state.people,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showUser: () => dispatch(UserActions.showRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipePeopleScreenContainer)
