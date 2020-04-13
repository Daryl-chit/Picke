import React, { Component } from 'react'
import { connect } from 'react-redux'
import SavedPlacesScreen from './SavedPlacesScreen'

import VenuesActions from 'Redux/VenuesRedux'

class SavedPlacesScreenContainer extends Component {
  render () {
    return (
      <SavedPlacesScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favourites: state.venues.favourites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavourite: (venueId) => dispatch(VenuesActions.venueFavouritesRemove(venueId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedPlacesScreenContainer)
