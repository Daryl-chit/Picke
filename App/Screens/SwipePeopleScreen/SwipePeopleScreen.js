import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import { calcRem, calcWidth, width as screenWidth } from 'Themes'
import { CardSwiper } from 'Components'
import Modal from 'react-native-modal'
import Locales from 'Locales'

import styles from './SwipePeopleScreen.style'

export default class SwipePeopleScreen extends Component {
  state = {
    visible: this.props.user.is_hidden
  }

  activate = () => {
    this.setState({ visible: false })
    const { showUser } = this.props
    if (showUser) {
      showUser()
    }
  }

  render () {
    const { visible } = this.state
    return (
      <View style={styles.screenContainer}>
        <View style={styles.userCards}>
          <CardSwiper />
        </View>
        <Modal
          useNativeDriver
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          animationInTiming={500}
          animationOutTiming={400}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={400}
          isVisible={visible}>
          <View style={styles.modal}>
            <Text style={styles.modalHeaderText}>
              {Locales.t('accountHiddenTitle').toUpperCase()}
            </Text>
            <Text style={styles.modalText}>
              {Locales.t('accountActivateDescription')}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={this.activate}>
              <Text style={styles.modalButtonText}>
                {Locales.t('activate').toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}
