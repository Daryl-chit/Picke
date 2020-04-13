import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import { ModalPicker } from 'Components'
import styles from './ChooseInput.style'

export default class ChooseInput extends Component {
  constructor (props) {
    super(props)
    this.state = { selected: props.multiselect ? [] : null }
  }

  handleChange (value) {
    const { field, onChange } = this.props
    if (onChange) onChange(value, field)
  }

  onDone = (values) => {
    const { field, onChange } = this.props
    if (onChange) onChange(values, field)
    this.setState({ selected: values })
  }

  onSelect = ({ index }) => {
    const { values } = this.props
    this.setState({ selected: index })
    this.handleChange(values[index])
  }

  openPicker = () => this.refs.picker.show()

  render () {
    const { label, description, value, values, row, style, multiselect } = this.props
    const { selected } = this.state
    const data = values
    return (
      <View style={[styles.wrap, row ? styles.row : {}, style || {}]}>
        {label
          ? <Text style={styles.label}>
            {label.toUpperCase()} {description
          ? <Text style={[styles.label, styles.description]}>
            {description.toUpperCase()}
          </Text> : null}
        </Text> : null}
        <View style={styles.container}>
          <Text
            numberOfLines={1}
            style={styles.text}>
            {multiselect
              ? selected.length > 0
                ? selected.join(', ')
                : ''
              : selected !== null
                ? data[selected] : ''}
          </Text>
          <TouchableOpacity onPress={this.openPicker} style={styles.button}>
            <Text style={styles.buttonText}>CHOOSE</Text>
          </TouchableOpacity>
        </View>
        <ModalPicker
          ref='picker'
          title={label}
          onSelect={this.onSelect}
          onDone={this.onDone}
          selected={selected}
          multiselect={multiselect}
          data={data} />
      </View>
    )
  }
}
