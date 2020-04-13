import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCardScreen from './UserCardScreen'
import PersonActions from 'Redux/PersonRedux'

class UserCardScreenContainer extends Component {
  componentWillMount () {
    const { userId, getPerson } = this.props
    if (userId) getPerson(userId)
  }

  render () {
    return (
      <UserCardScreen {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    person: state.person,
    user: state.user,
    reportData: state.person.reportData,
    blockData: state.person.blockData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPerson: (userId) => dispatch(PersonActions.personRequest(userId)),
    report: (user_id, text) => dispatch(PersonActions.reportRequest(user_id, text)),
    block: (user_id) => dispatch(PersonActions.blockRequest(user_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(UserCardScreenContainer)
