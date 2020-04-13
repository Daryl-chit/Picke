import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipeVenues from './SwipeVenues'

import VenuesActions from 'Redux/VenuesRedux'

class SwipeVenuesContainer extends Component {
  render () {
    return (
      <SwipeVenues {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    venues: state.venues,
    favourites: state.venues.favourites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavourite: (venue) => dispatch(VenuesActions.venueFavouritesAdd(venue)),
    removeFavourite: (venueId) => dispatch(VenuesActions.venueFavouritesRemove(venueId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeVenuesContainer)
