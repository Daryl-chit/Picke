import React, { Component } from 'react'
import { connect } from 'react-redux'

import SettingsActions from 'Redux/SettingsRedux'
import LoginActions from 'Redux/LoginRedux'
import SettingsScreen from './SettingsScreen'
import UserActions from 'Redux/UserRedux'

import LikeActions from 'Redux/LikeRedux'
import DialogsActions from 'Redux/DialogsRedux'
import MatchedUsersActions from 'Redux/MatchedUsersRedux'

class SettingsScreenContainer extends Component {
  render () {
    return (
      <SettingsScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    settings: state.settings,
    dict: state.dict,
    dialogs: state.dialogs,
    favouritesTotal: state.venues.favourites.length,
    showData: state.user.showData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSettings: (params) => dispatch(SettingsActions.setSettings(params)),
    showUser: () => dispatch(UserActions.showRequest()),
    logout: () => dispatch(LoginActions.logoutRequest()),
    subscriptionRequest: (params) => dispatch(UserActions.subscriptionRequest(params)),
    subscriptionLog: (data) => dispatch({ type: 'SUBSRIPTION_LOG_REQUEST', data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreenContainer)
