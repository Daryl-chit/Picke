import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardSwiper from './CardSwiper'
import PeopleActions from 'Redux/PeopleRedux'
import LikeActions from 'Redux/LikeRedux'
import PersonActions from 'Redux/PersonRedux'
import InstagramActions from 'Redux/InstagramRedux'
import UserActions from 'Redux/UserRedux'

class CardSwiperContainer extends Component {
  componentWillMount () {
    const { getPeople } = this.props
    getPeople()
  }
  render () {
    return (
      <CardSwiper {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    people: state.people,
    likes: state.likes,
    settings: state.settings,
    totalWhoLiked: state.likes.totalWhoLiked,
    reportData: state.person.reportData,
    blockData: state.person.blockData
    // instagram: state.instagram
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPeople: (params) => dispatch(PeopleActions.peopleRequest(params)),
    like: (user_id) => dispatch(LikeActions.likeRequest(user_id)),
    dislike: (user_id) => dispatch(LikeActions.dislikeRequest(user_id)),
    report: (user_id, text) => dispatch(PersonActions.reportRequest(user_id, text)),
    block: (user_id) => dispatch(PersonActions.blockRequest(user_id)),
    getInstagramMedia: (username) => dispatch(InstagramActions.getInstagramMediaRequest(username)),
    subscriptionRequest: (receipt) => dispatch(UserActions.subscriptionRequest(receipt)),
    subscriptionLog: (data) => dispatch({ type: 'SUBSRIPTION_LOG_REQUEST', data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSwiperContainer)
