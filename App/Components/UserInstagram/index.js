import UserInstagram from './UserInstagram'
import { connect } from 'react-redux'
import UserActions from 'Redux/UserRedux'

const mapStateToProps = (state) => {
  return {
    // instagramUser: state.user.instagram_user,
    // username: state.instagram.instagramUser,
    // instagrams: state.people.instagrams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    syncInstagram: token => dispatch(UserActions.syncInstagramRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInstagram)
