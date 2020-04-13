import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native'

import * as Ani from 'react-native-animatable'
import Modal from 'react-native-modal'

import { VenueDetails } from 'Components'
import { Images } from 'Themes'
import styles from './VenueModal.style'

export default class VenueModal extends Component {
  close = () => {
    const { onClose } = this.props
    if (onClose) onClose()
  }
  render () {
    const { open, venue } = this.props
    return (
      <View style={styles.component}>
        <Modal
          visible={open}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}>
          <View style={styles.wrap}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <VenueDetails
                  noFav
                  style={{
                    borderWidth: 0,
                    borderColor: '#000'
                  }}
                  venue={venue} />
              </View>
              <TouchableOpacity
                onPress={this.close}
                style={styles.close}>
                <Image
                  source={Images.closeWhite}
                  style={styles.closeIcon} />
              </TouchableOpacity>
              <Image
                source={Images.fadeGradientRight}
                style={styles.rightGradient}
                resizeMode='stretch' />
            </View>
            {open ? <Ani.View
              animation='fadeIn'
              delay={500}
              duration={700}
              style={styles.overlay} /> : null}
           </View>
        </Modal>
      </View>
    )
  }
}
