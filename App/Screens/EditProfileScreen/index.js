import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditProfileScreen from './EditProfileScreen'

import UserActions from 'Redux/UserRedux'

class EditProfileScreenContainer extends Component {
  render () {
    return (
      <EditProfileScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    dict: state.dict
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (params) => dispatch(UserActions.setUser(params)),
    syncInstagram: (token) => dispatch(UserActions.syncInstagramRequest(token)),
    cleanInstagram: () => dispatch(UserActions.cleanInstagramRequest()),
    addPhoto: (params) => dispatch(UserActions.addPhotoRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreenContainer)
