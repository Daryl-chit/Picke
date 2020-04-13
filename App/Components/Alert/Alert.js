import React, { Component } from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import DropdownAlert from 'Components/DropdownAlert'
import NotificationActions from 'Redux/NotificationRedux'
import { connect } from 'react-redux'
import { Images, Colors } from 'Themes'
// import { FastImage as Image } from 'Components'
import moment from 'moment'

import { Actions } from 'react-native-router-flux'

import { convertUTCtoLocal } from 'Utils/Time'
// Usage in sagas / components via redux action:
// import NotificationActions from 'Redux/NotificationRedux'
// yield put(NotificationActions.alertWithType({ type: 'error', title: 'Error', message: 'Asadadsada' }))

class Alert extends Component {
  componentDidUpdate (prevProps, prevState, prevContext) {
    const { notifications } = this.props
    const { alertWithType, key } = notifications
    if (key > prevProps.notifications.key && alertWithType && alertWithType.title) {
      // console.log(alertWithType)
      this.alert(alertWithType)
    }
  }

  renderTitle = state => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ color: '#aaaaaa', fontSize: 10, fontWeight: 'bold' }}>{state.title}</Text>
          { state.plus ? <Image source={Images.plus} style={{ height: 10, width: 25, marginLeft: 2 }} /> : null }
        </View>
        { state.createAt ? <Text style={{ color: '#bbbbbb', fontSize: 10 }}>{moment(convertUTCtoLocal(state.createAt)).fromNow()}</Text> : null }
      </View>
    )
  }

  renderMessageOnlyText = ({message, messageImage}) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 5 }}>
        <Text numberOfLines={2} style={{ color: '#000000', fontSize: 12 }}>{message}</Text>
        { messageImage ? <Text numberOfLines={2} style={{ color: '#000000', fontSize: 12 }}>You recieved</Text> : null }
        { messageImage ? <View style={{paddingHorizontal: 5, paddingVertical: 3, backgroundColor: Colors.purplePink, marginLeft: 5, borderRadius: 4}}>
          <Text style={{ color: Colors.white, fontSize: 12, lineHeight: 12 }}>new image!</Text>
        </View> : null }
      </View>
    )
  }

  renderMessageMatch = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 5 }}>
        <Text numberOfLines={2} style={{ color: '#000000', fontSize: 12 }}>You have a</Text>
        <View style={{paddingHorizontal: 5, paddingVertical: 3, backgroundColor: Colors.purplePink, marginLeft: 5, borderRadius: 4}}>
          <Text style={{ color: Colors.white, fontSize: 12, lineHeight: 12 }}>new match!</Text>
        </View>
      </View>
    )
  }

  renderMessage = state => {
    if (state.type === 'match') {
      return this.renderMessageMatch(state)
    } else {
      return this.renderMessageOnlyText(state)
    }
  }

  renderImage = state => {
    return (
      <View style={{ alignSelf: 'center', borderRadius: 5, overflow: 'hidden' }}>
        <Image
          backgroundColor='#cccccc'
          // resizeMode={'cover'}
          style={{width: 50, height: 65}}
          source={{ uri: state.image }}
        />
      </View>
    )
  }

  onTap = (state) => {
    if (state.type === 'match') {
      Actions.viewMatchScreen({ matchId: state.matchId, userId: state.userId })
    } else {
      Actions.chatScreen({ matchId: state.matchId, userId: state.userId })
      this.props.setCurrent({
        matchId: state.matchId,
        userId: state.userId
      })
    }
  }

  alert = (...args) => this.dropdown.alert(...args)
  render () {
    return (
      <DropdownAlert
        ref={(ref) => { this.dropdown = ref }}
        defaultContainer={{ paddingHorizontal: 10, paddingTop: 25, paddingBottom: 10, shadowColor: '#000000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 10 }}
        infoColor={'#ffffff'}
        activeStatusBarStyle={'dark-content'}
        titleStyle={{ color: '#aaa', fontSize: 10, fontWeight: 'bold' }}
        tapToCloseEnabled={false}
        onTap={this.onTap}

        renderTitle={this.renderTitle}
        renderMessage={this.renderMessage}
        renderImage={this.renderImage}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  }
}

const mapDispatchToProps = (dispatch) => ({
  alert: (props) => dispatch(NotificationActions.alertWithType(props)),
  setCurrent: (props) => dispatch(NotificationActions.setCurrent(props))
})

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
