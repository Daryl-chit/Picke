import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

import {
  SettingsSection as Section,
  ControlGroup as Group
} from 'Components/Settings/Components/SettingsLayout'
import { Column as Col, Row } from 'react-native-flexbox-grid'
import EStyleSheet from 'react-native-extended-stylesheet'

import { Colors, Fonts } from 'Themes'
import { MaterialSwitch as Switch, SettingsRow } from 'Components'

export default class SettingsApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: !props.user.is_hidden
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ visible: !nextProps.user.is_hidden})
  }

  onChange = () => {
    this.setState({ visible: true })
    const { onToggle } = this.props
    if (onToggle) {
      onToggle()
    }
  }
  setSettings = (values, field) => {
    let option = field
    let value = values
    const { setSettings } = this.props
  }
  render () {
    const { visible } = this.state
    return (
      <View style={[{ flex: 1 }]}>
        <Section title='Notifications'>
          <Group>
            <SettingsRow
              field='notifyNewMatches'
              name='New Matches' />
            <SettingsRow
              field='notifyMessages'
              name='Messages' />
            <SettingsRow
              field='notifyMessagesPlus'
              name='Messages Plus+' />
            <SettingsRow
              field='notifyEmails'
              name='Picke Emails' />
          </Group>
        </Section>
        <Section title='Show profile'>
          <Group>
            <View style={styles.settingsRow}>
              <Row>
                <Col sm={9.7} style={styles.label}>
                  <Text style={[
                    styles.settingsRowText,
                    visible ? { color: Colors.purplePink } : {}
                  ]}>{'Show Me on Picke'}</Text>
                </Col>
                <Col sm={2.3}>
                  <Switch
                    value={visible}
                    onValueChange={this.onChange} />
                </Col>
              </Row>
            </View>
          </Group>
        </Section>
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
