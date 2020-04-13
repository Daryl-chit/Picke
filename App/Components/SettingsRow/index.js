import React, { Component } from 'react'
import { connect } from 'react-redux'

import SettingsActions from 'Redux/SettingsRedux'

import SettingsRow from './SettingsRow'

class SettingsRowContainer extends Component {
  render () {
    return (
      <SettingsRow {...this.props} />
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
    editSettings: (params) => dispatch(SettingsActions.editSettings(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsRowContainer)
