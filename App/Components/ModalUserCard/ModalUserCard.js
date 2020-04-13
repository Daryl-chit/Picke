import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native'

import styles from './ModalUserCard.style'

import Modal from 'react-native-modal'

import { Colors } from 'Themes'
import { SelectList } from 'Components'

export default class ModalUserCard extends Component {
  state = {
    visible: false,
    values: []
  }

  componentWillReceiveProps (next, prev) {
    if (next.visible !== prev.visible) {
      this.setState({ visible: next.visible })
    }
  }

  show = () => this.setState({ visible: true })

  hide = () => this.setState({ visible: false })

  render () {
    const { data, visible, field, onSelect, title, selected, onDone, multiselect } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationIn={'bounceInRight'}
          animationInTiming={955}
          animationOutTiming={755}
          animationOut={'bounceOutRight'}
          backdropOpacity={0.3}
          backdropTransitionInTiming={1200}
          backdropTransitionOutTiming={750}
          onBackdropPress={() => this.hide()}
          isVisible={this.state.visible}>
          <View style={styles.modalContainer}>
            <Text>test</Text>
          </View>
        </Modal>
      </View>
    )
  }

}
