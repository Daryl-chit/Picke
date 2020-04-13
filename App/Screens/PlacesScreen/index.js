import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlacesScreen from './PlacesScreen'

class PlacesScreenContainer extends Component {
  render () {
    return (
      <PlacesScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    venues: state.venues
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesScreenContainer)
