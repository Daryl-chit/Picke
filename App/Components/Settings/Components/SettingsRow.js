/* @flow */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'

import { Column as Col, Row } from 'react-native-flexbox-grid'

import { Colors, Fonts } from 'Themes'
import { MaterialSwitch as Switch, ModalPicker } from 'Components'

export default class SettingsRow extends Component {
  constructor (props) {
    super(props)
    const { settings, field, multiselect } = props
    this.state = {
      value: settings[field],
      values: []
    }
  }
  onChange = (value) => {
    const { onChange, field, setSettings, multiselect } = this.props
    if (field === 'visibility') {
      value = true
    }
    this.setState({ value })
    setSettings({ option: field, value })
    if (multiselect && value) {
      this.refs.picker.show()
    }
    if (onChange) onChange(value, field)
  }
  onSelect = values => {
    this.setState({ values })
  }
  render () {
    const { name, multiselect, list, field } = this.props
    const { value, values } = this.state

    return (
      <View style={styles.settingsRow}>
        <Row>
          <Col sm={9.7} style={styles.label}>
            <Text style={[
              styles.settingsRowText,
              value ? { color: Colors.purplePink } : {}
            ]}>{name}</Text>
          </Col>
          <Col sm={2.3}>
            <Switch
              value={value}
              onValueChange={this.onChange} />
          </Col>
        </Row>
        {multiselect && value
        ? <View style={styles.multiselect}>
          <Text style={styles.optionsText}>{values.join(', ')}</Text>
        </View> : null}
        {multiselect
        ? <ModalPicker
          ref='picker'
          title={name}
          multiselect
          onSelect={this.onSelect}
          selected={values}
          data={list} /> : null}
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  label: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  settingsRow: {
    paddingVertical: '0.25rem',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  settingsRowText: {
    fontFamily: Fonts.type.base,
    fontWeight: '500',
    color: '#111',
    fontSize: '1rem'
  }
})
