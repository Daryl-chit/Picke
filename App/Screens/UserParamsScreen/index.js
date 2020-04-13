import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserParamsScreen from './UserParamsScreen'

import UserActions from 'Redux/UserRedux'
import SettingsRedux from 'Redux/SettingsRedux'

class UserParamsScreenContainer extends Component {
  render () {
    return (
      <UserParamsScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    dict: state.dict,
    settings: state.settings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (params) => dispatch(UserActions.setUser(params)),
    setSettings: (params) => dispatch(SettingsRedux.setSettings(params)),
    editSettings: (params) => dispatch(SettingsRedux.editSettings(params)),
    addPhoto: (params) => dispatch(UserActions.addPhotoRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserParamsScreenContainer)
