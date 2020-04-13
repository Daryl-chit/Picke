import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginActions from 'Redux/LoginRedux'
import UserActions from 'Redux/UserRedux'
import DeleteAccountScreen from './DeleteAccountScreen'

class DeleteAccountScreenContainer extends Component {
  render () {
    return (
      <DeleteAccountScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hiddenData: state.user.hiddenData,
    deleteData: state.user.deleteData,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (reason) => dispatch(UserActions.deleteRequest(reason)),
    hideUser: () => dispatch(UserActions.hideRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccountScreenContainer)
