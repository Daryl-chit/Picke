import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import Modal from 'react-native-modal'
import { Actions } from 'react-native-router-flux'
import { Header, FastImage } from 'Components'
import { Images, Colors } from 'Themes'
import Locales from 'Locales'
import styles from './HideAccountScreen.style'

class HideAccountScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: this.props.user.is_hidden
    }
  }

  hideModal = () => {
    this.setState({ visible: false })
    Actions.replace('messagesScreen')
  }

  _hide = () => {
    this.setState({ visible: true })
    const { hideUser } = this.props
    if (hideUser) {
      hideUser()
    }
  }

  _delete = () => {
    const { user } = this.props
    Actions.deleteAccountScreen({ user: user })
  }

  render () {
    const { user } = this.props
    const { visible } = this.state
    if (user) {
      const { photos } = user
      const image = photos && photos.length > 0 ? photos[0].path : null
      return (
        <View style={styles.screen}>
          <Header title={'Deactivate'} noBorder />
          <View style={styles.container}>
            <Text style={styles.title}>HIDE MY ACCOUNT</Text>
            <View>
              <FastImage style={styles.photo} resizeMode={'cover'} source={{ uri: image }} />
              <FastImage style={styles.icon} source={Images.hide} />
            </View>
            <Text style={styles.description}>
              If you would like to keep your account but not be shown to others, you can hide your account instead.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.hideButton} onPress={this._hide}>
              <Text style={[styles.buttonText, {color: Colors.white}]}>
                Hide My Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={this._delete}>
              <Text style={[styles.buttonText, {color: Colors.black62}]}>
                Delete My Account
              </Text>
            </TouchableOpacity>
          </View>
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
    } else {
      return null
    }
  }
}

export default HideAccountScreen
