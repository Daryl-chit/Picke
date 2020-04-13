import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native'

import Modal from 'react-native-modal'
import { Actions } from 'react-native-router-flux'
import { Header, ActionSheet } from 'Components'
import { Colors, Images, rem } from 'Themes'

import Locales from 'Locales'
import styles from './DeleteAccountScreen.style'
import DeleteItem from './Components/DeleteItem'

const items = [
  {
    title: 'I\'ve met someone',
    image: Images.deleteIcons.met
  },
  {
    title: 'I need a break from Picke',
    image: Images.deleteIcons.break
  },
  {
    title: 'I don\'t like Picke',
    image: Images.deleteIcons.dislike
  },
  {
    title: 'I want a fresh start',
    image: Images.deleteIcons.fresh
  },
  {
    title: 'Something is broken',
    image: Images.deleteIcons.broken
  },
  {
    title: 'Other',
    image: Images.deleteIcons.other
  }
]

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 3
const options = [
  'Cancel',
  <Text style={{color: Colors.purplePink, fontSize: 18}}>Hide My Account</Text>,
  <Text style={{color: Colors.purplePink, fontSize: 18}}>Delete My Account</Text>
]

export default class DeleteAccountScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reason: null,
      visible: this.props.user.is_hidden
    }
    this.handlePress = this.handlePress.bind(this)
    this.showActionSheet = this.showActionSheet.bind(this)
  }

  showActionSheet (reason) {
    this.setState({ reason: reason })
    this.ActionSheet.show()
  }

  handlePress (i) {
    const { hideUser, deleteUser } = this.props
    const { reason } = this.state
    if (i == 1) {
      this.setState({ visible: true })
      hideUser()
    } else if ( i == 2) {
      deleteUser(reason)
    }
  }

  hideModal = () => {
    this.setState({ visible: false })
    Actions.replace('messagesScreen')
  }

  renderInfo = () => {
    return (
      <View style={styles.info}>
        <Text style={styles.infoTitle}>
          {Locales.t('deleteAccount').toUpperCase()}
        </Text>
        <Text style={styles.infoDescription}>
          {'Please let us know the reason why you are leaving.'}
        </Text>
      </View>
    )
  }

  renderItems = () => {
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        numColumns={2}
        scrollEnabled={false}
        style={{width: '100%'}}
        contentContainerStyle={{paddingTop: rem * 1.5, paddingBottom: rem * 2}}
        keyExtractor={(item, index) => index}
      />
    )
  }

  renderItem = (item) => {
    return (
      <View style={styles.deleteItem}>
        <DeleteItem
          item={item.item}
          onPress={this.showActionSheet}
        />
      </View>
    )
  }

  render () {
    const { visible } = this.state
    return (
      <View style={styles.screen}>
        <Header title={Locales.t('deleteAccount')} noBorder />
        {this.renderInfo()}
        {this.renderItems()}
        <ActionSheet
          ref={o=> this.ActionSheet = o}
          title={Locales.t('deleteTitle').toUpperCase()}
          message={Locales.t('deleteDescription')}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          tintColor={Colors.black75}
          onPress={this.handlePress}/>
        <Modal
          useNativeDriver
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          animationInTiming={500}
          animationOutTiming={400}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={400}
          isVisible={visible}
          onBackdropPress={this.hideModal}>
          <View style={styles.modal}>
            <Text style={styles.modalHeaderText}>
              {Locales.t('accountHiddenTitle').toUpperCase()}
            </Text>
            <Text style={styles.modalText}>
              {Locales.t('accountHiddenDescription')}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={this.hideModal}>
              <Text style={styles.modalButtonText}>
                {Locales.t('ok').toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}
