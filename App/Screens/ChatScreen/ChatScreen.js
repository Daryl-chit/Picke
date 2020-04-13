import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Spinner from 'react-native-spinkit'

import {
  Header,
  Chat,
  AnimatedLoader,
  ErrorHandler,
  DialogTitle,
  ActionSheet,
  UserActions
} from 'Components'

import Locales from 'Locales'
import { calcRem, Colors, Images, IS_IOS } from 'Themes'

import styles from './ChatScreen.style'

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [
  'Cancel',
  <Text style={{color: Colors.purplePink, fontSize: 18}}>Unmatch</Text>,
  <Text style={{color: Colors.purplePink, fontSize: 18}}>Report</Text>,
  <Text style={{color: Colors.purplePink, fontSize: 18}}>Block</Text>
]

const errorOptions = [
  'Cancel',
  <Text style={{color: Colors.textGreen, fontSize: 18}}>Resend Message</Text>
]

export default class ChatScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedMessage: null
    }
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  showErrorActionSheet = (message) => {
    this.setState({selectedMessage: message})
    this.ErrorSheet.show()
  }

  handlePress = (i) => {
    if (i != CANCEL_INDEX) {
      this.showUserActions(i)
    }
  }

  handleErrorPress = (i) => {
    const { selectedMessage } = this.state
    const { sendMessage, matchId } = this.props
    const { text, image, _id } = selectedMessage
    if (i == 1) {
      // Resend message
      if (text !== '' || image !== '') {
        const message = text
        const imgFile = image
        const messageId = _id

        if (sendMessage) {
          sendMessage({ 'message': text, 'imgFile': image, 'matchId': matchId, 'messageId': _id })
        }
      }
    }
  }

  showUserActions (i) {
    const type = this._getActionType(i)
    this.UserActions.show(type)
  }

  handleConfirm = (type, id) => {
    const { userId } = this.props
    if (type === 'unmatch') {
      const { unmatch } = this.props
      unmatch(userId)
    } else if (type === 'report') {
      const { report } = this.props
      report(userId, 'report')
    } else if (type === 'block') {
      const { block } = this.props
      block(userId)
    }
    setTimeout(() => {
      Actions.reset('messagesScreen')
      this.props.setCurrent({ matchId: null, userId: null })
    }, 400)
  }

  _getActionType (i) {
    let type = 'unmatch'
    if (i == 1) {
      type = 'unmatch'
    } else if (i == 2) {
      type = 'report'
    } else if (i == 3) {
      type = 'block'
    }
    return type
  }

  renderName () {
    const { person } = this.props
    const { item } = person
    return (
      <Text style={styles.userNameText}>
        {item.name}, <Text style={styles.userAge}>{item.age}</Text>
      </Text>
    )
  }

  renderSpinner () {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Spinner
          style={{
            marginTop: -100,
            width: calcRem(8),
            height: calcRem(8),
            alignSelf: 'center'
          }}
          size={calcRem(8)}
          type={ IS_IOS ? 'Arc' : 'Circle' }
          color={Colors.purplePink}
        />
      </View>
    )
  }

  openUserCardScreen = () => {
    const { person, userId } = this.props
    if (person) {
      const { item } = person
      Actions.userCardScreen({ userId: userId, userName: item.name })
    }
  }

  renderHeaderRight = () => {
    return (
      <TouchableOpacity style={styles.userButton} onPress={this.showActionSheet}>
        <Image
          resizeMode='contain'
          source={Images.userLine}
          style={styles.userLineIcon} />
      </TouchableOpacity>
    )
  }

  render () {
    const { person, messages } = this.props
    const isReady = (person && person.item && messages && messages.history && messages.history.length > 0)

    return (
      <View style={styles.screen}>
        <Header
          title={false}
          right={this.renderHeaderRight()}
          onBack={() => {
            Actions.reset('messagesScreen')
            this.props.setCurrent({ matchId: null, userId: null })
          }}
          afterTitle={
            <TouchableOpacity onPress={this.openUserCardScreen}>
              <DialogTitle user={person.item} />
            </TouchableOpacity>
          }
          noBorder
        />
        {isReady
          ? <Chat {...this.props}
              openUserModal={this.openUserCardScreen}
              onError={this.showErrorActionSheet}/>
          : messages.error
            ? <ErrorHandler problem={messages.problem} title={'Can\'t get chat history'} />
            : this.renderSpinner()}
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          tintColor={Colors.black75}
          onPress={this.handlePress}/>
        <ActionSheet
          ref={o => this.ErrorSheet = o}
          title={Locales.t('sendErrorTitle').toUpperCase()}
          message={Locales.t('sendErrorMessage')}
          messageHeight={60}
          options={errorOptions}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={2}
          tintColor={Colors.black75}
          onPress={this.handleErrorPress} />
        <UserActions
          ref={o => this.UserActions = o}
          user={person.item}
          onConfirm={this.handleConfirm}/>
      </View>
    )
  }
}
