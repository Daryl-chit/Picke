import React, { Component } from 'react'
import { connect } from 'react-redux'
import Location from './Location'
import UserActions from 'Redux/UserRedux'

class LocationContainer extends Component {
  render () {
    return <Location {...this.props} />
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocation: params => dispatch(UserActions.setLocation(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)
