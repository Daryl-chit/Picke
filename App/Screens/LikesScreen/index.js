import React, { Component } from 'react'
import { connect } from 'react-redux'
import LikesScreen from './LikesScreen'
import LikeActions from 'Redux/LikeRedux'
import DialogsActions from 'Redux/DialogsRedux'
import MatchedUsersActions from 'Redux/MatchedUsersRedux'

class LikesScreenContainer extends Component {
  componentWillMount () {
    const { likedRequest } = this.props
    likedRequest()
  }
  render () {
    return (
      <LikesScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    likes: state.likes,
    usersWhoLikedList: state.likes.usersWhoLiked,
    totalWhoLiked: state.likes.totalWhoLiked,
    clean: state.likes.clean
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    like: userId => dispatch(LikeActions.likeRequest(userId)),
    dislike: userId => dispatch(LikeActions.dislikeRequest(userId)),
    likedRequest: () => dispatch(LikeActions.likedRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikesScreenContainer)
