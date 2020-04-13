import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import Locales from 'Locales'

import { SwipeVenues } from 'Components'

import styles from './SwipePlacesScreen.style'

export default class SwipePlacesScreen extends Component {

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
    const { venues } = this.props
    const { visible } = this.state
    let venue = null
    if (venues.list && venues.list.length > 0) {
      venue = venues.list[1]
    }
    return (
      <View style={styles.screen}>
        <View style={styles.imageSlider}>
          {venues.list && venues.list.length > 0 ? <SwipeVenues cards={venues.list} /> : null}
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
