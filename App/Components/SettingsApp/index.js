import React, { Component } from 'react'
import { connect } from 'react-redux'

import SettingsActions from 'Redux/SettingsRedux'
import PeopleActions from 'Redux/PeopleRedux'
import SettingsApp from './SettingsApp'

class SettingsAppContainer extends Component {
  render () {
    return (
      <SettingsApp {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAppContainer)
