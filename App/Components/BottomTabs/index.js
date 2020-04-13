import React, { Component } from 'react'
import { connect } from 'react-redux'

import BottomTabs from './BottomTabs'

class BottomTabsContainer extends Component {
  render () {
    return (
      <BottomTabs {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    totals: state.dialogs.totals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabsContainer)
