import React, { Component } from 'react'
import { connect } from 'react-redux'
import SortPhotos from './SortPhotos'

import UserActions from 'Redux/UserRedux'

class SortPhotosContainer extends Component {
  render () {
    return (
      <SortPhotos {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    photos: state.user.photos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (params) => dispatch(UserActions.setUser(params)),
    deletePhoto: (params) => dispatch(UserActions.deletePhotoRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortPhotosContainer)
