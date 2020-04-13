import React, { Component } from 'react'
import { connect } from 'react-redux'

import SettingsActions from 'Redux/SettingsRedux'
import PeopleActions from 'Redux/PeopleRedux'
import UserActions from 'Redux/UserRedux'
import Settings from './Settings'

class SettingsContainer extends Component {
  render () {
    return (
      <Settings {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    settings: state.settings,
    dict: state.dict
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSettings: (params) => dispatch(SettingsActions.setSettings(params)),
    peopleRequest: (params) => dispatch(PeopleActions.peopleRequest(params)),
    editSettings: (params) => dispatch(SettingsActions.editSettings(params)),
    userRequest: () => dispatch(UserActions.userRequest()),
    subscriptionRequest: (receipt) => dispatch(UserActions.subscriptionRequest(receipt)),
    subscriptionLog: (data) => dispatch({ type: 'SUBSRIPTION_LOG_REQUEST', data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
