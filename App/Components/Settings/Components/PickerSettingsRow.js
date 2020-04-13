/* @flow */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation
} from 'react-native'

import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'

import { Column as Col, Row } from 'react-native-flexbox-grid'

import { Colors, Fonts } from 'Themes'
import { MaterialSwitch as Switch, ModalPicker } from 'Components'

import { getDictNames } from 'Tools'

export default class PickerSettings extends Component {
  constructor (props) {
    super(props)
    const { settings, field, multiselect, dictName, dict, initialValues } = props
    let values = []
    if (field === 'searchByBodyType') {
      values = settings.searchByBodyType.asMutable()
    } else {
      values = getDictNames(settings[field], dictName, dict)
    }
    this.state = {
      value: values && values.length > 0 ? true : false,
      values: values || []
    }
  }
  onChange = (value) => {
    const { onToggle, field, editSettings, isUserPlus, nonUserPlusSwitchChange } = this.props
    if (isUserPlus) {
      this.setState({ value })
      LayoutAnimation.spring()
      if (value) {
        this.refs.picker.show()
      } else {
        editSettings({ [field]: [] })
        if (onToggle) onToggle(value, field)
        this.setState({ values: [] })
      }
    } else if (nonUserPlusSwitchChange) nonUserPlusSwitchChange()
  }

  onSelect = values => {
    const { onChange, field, dictName } = this.props
    if (values.length === 0) this.setState({ value: false })
    LayoutAnimation.spring()
    this.setState({ values })
    if (onChange) onChange(values, field, dictName)
  }

  onModalBackdropPress = values => {
    this.setState({ value: false })
  }

  render () {
    const { name, list, field } = this.props
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
        {value && values.length > 0
        ? <View style={styles.multiselect}>
          <Text style={styles.optionsText}>{values.join(', ')}</Text>
        </View> : null}
        <ModalPicker
          ref='picker'
          title={name}
          multiselect
          onDone={this.onSelect}
          selected={values}
          onBackdropPress={this.onModalBackdropPress}
          data={list} />
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
    paddingBottom: '0.4rem',
    paddingTop: '0.25rem',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  optionsText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: '#6c6c6c',
    fontSize: '0.9rem',
    marginTop: '0.8rem'
  },
  settingsRowText: {
    fontFamily: Fonts.type.base,
    fontWeight: '500',
    color: '#111',
    fontSize: '1rem'
  }
})
