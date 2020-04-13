import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingScreen from './LoadingScreen'

class LoadingScreenContainer extends Component {
  render () {
    return (
      <LoadingScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreenContainer)

