import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native'

import Locales from 'Locales'
import styles from './ActivateModal.style'

class ActivateModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  show () {
    this.setState({ visible: true })
  }

  activate = () => {
    const { onPress } = this.props
    this.setState({ visible: false })
    if (onPress) {
      onPress()
    }
  }

  render () {
    const { visible } = this.state
    return (
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
            {Locales.t('accountHiddenDescription')}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={this.activate}>
            <Text style={styles.modalButtonText}>{Locales.t('activate').toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

export default ActivateModal
