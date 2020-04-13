import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Dialogs from './Dialogs'
import DialogsActions from 'Redux/DialogsRedux'
import NotificationActions from 'Redux/NotificationRedux'

class DialogsContainer extends Component {
  componentWillMount () {
    this.props.getDialogs(0)
  }
  render () {
    return (
      <Dialogs {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    dialogs: state.dialogs,
    offset: state.dialogs.offset,
    list: state.dialogs.list,
    fetching: state.dialogs.fetching,
    loaded: state.dialogs.loaded,
    loading: state.dialogs.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDialogs: (offset) => dispatch(DialogsActions.dialogsRequest(offset)),
    setCurrent: (props) => dispatch(NotificationActions.setCurrent(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer)
