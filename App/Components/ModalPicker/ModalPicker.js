import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native'

import styles from './ModalPicker.style'

import Modal from 'react-native-modal'

import { Colors } from 'Themes'
import { SelectList } from 'Components'

export default class ModalPicker extends Component {
  state = {
    visible: false,
    values: []
  }

  componentWillReceiveProps (next, prev) {
    if (next.visible !== prev.visible) {
      this.setState({ visible: next.visible })
    }
  }

  onSelect = (props) => {
    const { onSelect, multiselect } = this.props
    const { values } = this.state
    if (multiselect) {
      let next = values
      if (values.includes(props.item)) {
        next = values.filter(f => f !== props.item)
      } else {
        next.push(props.item)
      }
      this.setState({ values })
    } else {
      this.complete(props)
    }
  }

  complete = (props) => {
    const { onSelect } = this.props
    if (onSelect) onSelect(props)
    this.hide()
  }

  onDone = (props) => {
    const { onDone } = this.props
    if (onDone) onDone(props)
    this.hide()
  }

  onBackdropPress = () => {
    const { onBackdropPress } = this.props
    if (onBackdropPress) onBackdropPress(this.state.values)
    this.hide()
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
          onBackdropPress={this.onBackdropPress}
          isVisible={this.state.visible}>
          <View style={styles.modalContainer}>
            <SelectList
              multiselect={multiselect}
              selected={selected}
              onDone={this.onDone}
              field={field}
              title={title}
              containerStyle={styles.selectList}
              data={data}
              onSelect={this.onSelect} />
          </View>
        </Modal>
      </View>
    )
  }

}
