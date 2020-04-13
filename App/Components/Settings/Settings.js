import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

import { uniq } from 'ramda'

import PickerSettingsRow from './Components/PickerSettingsRow'
import SliderRow from './Components/SliderRow'

import { SettingsSection as Section, ControlGroup as Group } from './Components/SettingsLayout'

import { getDictIds } from 'Tools'

import { SettingsRow, SubscriptionModal } from 'Components'
import { AGE_RANGE, HEIGHT_SEARCH_RANGE } from 'Config/Constants'

import styles from './Settings.style'

export default class Settings extends Component {
  editSettings = (values, field) => {
    let option = field
    let value = values
    const { editSettings } = this.props
    if (option === 'searchByDistance') {
      value = values[0]
    }
    editSettings({ [option]: value })
  }
  handlePickerChange = (values, option, dictName) => {
    const { editSettings, dict } = this.props
    let value = []
    if (dictName === 'bodyTypes') {
      value = values
    } else {
      value = getDictIds(values, dictName, dict)
    }
    editSettings({ [option]: value })
  }

  getBodyTypes = () => {
    const { dict } = this.props
    const { bodyTypes } = dict
    return bodyTypes && bodyTypes.length > 0
      ? uniq(bodyTypes.map(e => e.type)) : []
  }

  onSwitchChangeAge = value => {
    if (!value) {
      this.props.editSettings({searchByAge: []})
    } else {
      this.props.editSettings({searchByAge: AGE_RANGE})
    }
  }

  onSwitchChangeHeight = value => {
    if (!value) {
      this.props.editSettings({searchByHeight: []})
    } else {
      this.props.editSettings({searchByHeight: HEIGHT_SEARCH_RANGE})
    }
  }

  onSwitchChangeDistance = value => {
    if (!value) {
      this.props.editSettings({searchByDistance: false})
    } else {
      this.props.editSettings({searchByDistance: 100})
    }
  }

  openSubscriptionModal = () => this.refs.modal.open()

  renderFilterPlus = () => {
    const { user, dict, settings } = this.props
    const { userInfo } = user
    const { godUser, plusMember } = userInfo
    const isPlus = (godUser || plusMember === '1')

    return (
      <Section title='Picke Plus Filters'>
        <Group>
          <SliderRow
            {...this.props}
            min={HEIGHT_SEARCH_RANGE[0]}
            max={HEIGHT_SEARCH_RANGE[1]}
            onValuesChange={this.editSettings}
            onSwitchChange={this.onSwitchChangeHeight}
            initialValues={settings.searchByHeight || HEIGHT_SEARCH_RANGE}
            field='searchByHeight'
            units='feets'
            name='Height'
            multiselect
            isUserPlus={isPlus}
            nonUserPlusSwitchChange={this.openSubscriptionModal}
          />
        </Group>
        <Group>
          <PickerSettingsRow
            {...this.props}
            list={this.getBodyTypes()}
            dictName='bodyTypes'
            field='searchByBodyType'
            multiselect
            onChange={this.handlePickerChange}
            name='Search by Body Type'
            isUserPlus={isPlus}
            nonUserPlusSwitchChange={this.openSubscriptionModal}
          />
        </Group>
        <Group>
          <PickerSettingsRow
            {...this.props}
            dictName='ethnicities'
            list={dict.ethnicities.map(e => e.ethnicity)}
            onChange={this.handlePickerChange}
            field='searchByEthnicity'
            multiselect
            name='Search by Ethnicity'
            isUserPlus={isPlus}
            nonUserPlusSwitchChange={this.openSubscriptionModal}
          />
        </Group>
        <Group>
          <PickerSettingsRow
            {...this.props}
            dictName='religions'
            list={dict.religions.map(e => e.religion)}
            onChange={this.handlePickerChange}
            field='searchByReligion'
            multiselect
            name='Search by Religion'
            isUserPlus={isPlus}
            nonUserPlusSwitchChange={this.openSubscriptionModal}
          />
        </Group>
      </Section>
    )
  }

  render () {
    const { settings } = this.props

    return (
      <View style={[{ flex: 1 }]}>
        <Section title='Basic Filters'>
          <Group>
            <SettingsRow
              {...this.props}
              field='seekingMan'
              name='Seeking Men' />
            <SettingsRow
              {...this.props}
              field='seekingWomen'
              name='Seeking Women' />
          </Group>
          <Group>
            <SliderRow
              {...this.props}
              min={0}
              max={100}
              onValuesChange={this.editSettings}
              onSwitchChange={this.onSwitchChangeDistance}
              initialValues={settings.searchByDistance ? [settings.searchByDistance] : []}
              field='searchByDistance'
              units='miles'
              name='Distance' />
          </Group>
          <Group>
            <SliderRow
              {...this.props}
              min={AGE_RANGE[0]}
              max={AGE_RANGE[1]}
              onValuesChange={this.editSettings}
              onSwitchChange={this.onSwitchChangeAge}
              initialValues={settings.searchByAge || AGE_RANGE}
              field='searchByAge'
              units='years'
              name='Age'
              multiselect />
          </Group>
          {/* <Group>
            <SliderRow
              {...this.props}
              min={4.7}
              max={11}
              initialValues={[4.7, 11]}
              field='height'
              units='feets'
              step={0.1}
              name='Height' />
          </Group> */}
        </Section>

        { this.renderFilterPlus() }

        <SubscriptionModal
          subscriptionLog={this.props.subscriptionLog}
          subscriptionRequest={this.props.subscriptionRequest}
          startIndex={0}
          ref='modal' />
      </View>
    )
  }
}
