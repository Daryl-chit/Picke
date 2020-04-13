import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipePlacesScreen from './SwipePlacesScreen'

import VenueActions from 'Redux/VenueRedux'
import UserActions from 'Redux/UserRedux'

class SwipePlacesScreenContainer extends Component {
  render () {
    return (
      <SwipePlacesScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    venue: state.venue,
    venues: state.venues,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVenue: (venueId) => dispatch(VenueActions.venueRequest(venueId)),
    showUser: () => dispatch(UserActions.showRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipePlacesScreenContainer)
