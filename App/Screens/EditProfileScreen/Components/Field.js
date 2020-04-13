import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import { ModalPicker } from 'Components'
import styles from '../EditProfileScreen.style'

const split = (arr) => {
  return arr && arr.length > 0 ? arr.join(', ') : ''
}

class Field extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: props.multiselect ? [] : ''
    }
  }
  onPress = () => {
    this.refs.picker.show()
  }
  onSelect = (data) => {
    const { onSelect, field, dict } = this.props
    this.setState({ selected: data.item })
    if (onSelect) onSelect(data, field, dict)
  }
  onDone = (data) => {
    const { onSelect, field, dict } = this.props
    if (onSelect) onSelect(data, field, dict)
    this.setState({ selected: data })
  }
  render () {
    const { label, text, multiselect, list } = this.props
    const { selected } = this.state

    const selectedText = selected && selected.length > 0 && multiselect
    ? split(selected)
    : selected && selected.length > 0 ? selected : text

    return (
      <View>
        <TouchableOpacity style={styles.field} onPress={this.onPress}>
          <Text style={styles.labelText}>{label.toUpperCase()}</Text>
          <View style={styles.fieldButton}>
            <Text style={styles.fieldInputText}>{selectedText}</Text>
          </View>
        </TouchableOpacity>
        <ModalPicker
          ref='picker'
          title={label}
          onSelect={this.onSelect}
          onDone={this.onDone}
          selected={selected}
          multiselect={multiselect}
          data={list} />
      </View>
    )
  }
}

export default Field
