import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainScreen from './MainScreen'

import LikeActions from 'Redux/LikeRedux'
import DialogsActions from 'Redux/DialogsRedux'
import MatchedUsersActions from 'Redux/MatchedUsersRedux'
import { Actions } from 'react-native-router-flux'

class MainScreenContainer extends Component {
  render () {
    return (
      <MainScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    dialogs: state.dialogs,
    matchedUsers: state.matchedUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    likedRequest: () => dispatch(LikeActions.likedRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenContainer)
