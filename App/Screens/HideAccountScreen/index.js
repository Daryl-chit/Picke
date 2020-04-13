import React, { Component } from 'react'
import { connect } from 'react-redux'

import SettingsActions from 'Redux/SettingsRedux'
import LoginActions from 'Redux/LoginRedux'
import UserActions from 'Redux/UserRedux'
import HideAccountScreen from './HideAccountScreen'

class HideAccountScreenContainer extends Component {
  render () {
    return (
      <HideAccountScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hiddenData: state.hiddenData,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideUser: () => dispatch(UserActions.hideRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HideAccountScreenContainer)
