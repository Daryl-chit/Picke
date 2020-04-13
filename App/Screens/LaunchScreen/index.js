import React, { Component } from 'react'
import { connect } from 'react-redux'
import LaunchScreen from './LaunchScreen'

import UserActions from 'Redux/UserRedux'
import LoginActions from 'Redux/LoginRedux'

class LaunchScreenContainer extends Component {
  render () {
    return (
      <LaunchScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.login.fetching,
    update_required: state.login.update_required
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (params) => dispatch(UserActions.setUser(params)),
    smsLoginRequest: (code) => dispatch(LoginActions.smsLoginRequest(code)),
    loginRequest: (token, tokenType) => dispatch(LoginActions.loginRequest(token, tokenType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreenContainer)
