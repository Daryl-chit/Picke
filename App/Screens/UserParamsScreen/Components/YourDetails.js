import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import Locales from 'Locales'
import { Metrics, Fonts, Colors, rem } from 'Themes'
import { HEIGHT_RANGE } from 'Config/Constants'
import { Image, GradientButton as Button, SelectButton, ChooseInput, Input, TextArea } from 'Components'
import { withPropFilter, isArray } from 'Utils/Data'
import { userDetailsTransformer } from '../Utils'
import styles from '../UserParamsScreen.style'

const SCREEN = {
  fields: {
    height: {
      title: Locales.t('screens.yourDetails.fields.height.title'),
      description: Locales.t('screens.yourDetails.fields.height.description'),
    },
    bodyType: {
      title: Locales.t('screens.yourDetails.fields.bodyType.title'),
    },
    occupation: {
      title: Locales.t('screens.yourDetails.fields.occupation.title'),
    },
    religion: {
      title: Locales.t('screens.yourDetails.fields.religion.title'),
    },
    ethnicity: {
      title: Locales.t('screens.yourDetails.fields.ethnicity.title'),
    },
    about: {
      title: Locales.t('screens.yourDetails.fields.about.title'),
    },
  },
  button: Locales.t('continue').toUpperCase()
}

const FIELDS = {
  height: 'height',
  bodyType: 'bodyType',
  occupation: 'occupation',
  religion: 'religion',
  ethnicity: 'ethnicity'
}

export default class YourDetails extends Component {
  state = {
    about: '',
    isBodyType: false,
    isHeight: false,
    isOccupation: false,
    isReligion: false,
    isEthnicity: false
  }

  onFieldChange = (name, ...args) => {
    return (value, field) => {
      const newValue = userDetailsTransformer[name](value, field, ...args)
      if (newValue && (newValue.length > 0 || !isArray(newValue))) {
        
        this.props.setUser({ option: field, value: newValue })

        if (name === FIELDS.height) {
          this.setState({isHeight: true})
        } else if (name === FIELDS.bodyType) {
          this.setState({isBodyType: true})
        } else if (name === FIELDS.occupation) {
          this.setState({isOccupation: true})
        } else if (name === FIELDS.religion) {
          this.setState({isReligion: true})
        } else if (name === FIELDS.ethnicity) {
          this.setState({isEthnicity: true})
        }
      } else {
        if (name === FIELDS.height) {
          this.setState({isHeight: false})
        } else if (name === FIELDS.bodyType) {
          this.setState({isBodyType: false})
        } else if (name === FIELDS.occupation) {
          this.setState({isOccupation: false})
        } else if (name === FIELDS.religion) {
          this.setState({isReligion: false})
        } else if (name === FIELDS.ethnicity) {
          this.setState({isEthnicity: false})
        }
      }
    }
  }

  onSubmit = () => {
    const { onSubmit } = this.props
    if (onSubmit) {
      this.props.setUser({ option: 'about', value: this.state.about })
      onSubmit()
    }
  }

  render () {
    const { about, isHeight, isBodyType, isOccupation, isReligion, isEthnicity } = this.state
    const { dict: { occupations, ethnicities, religions, bodyTypes }, user: { gender } } = this.props
    const userBodyTypes = withPropFilter({ prop: 'gender', value: gender }, bodyTypes)
    const isFilled = isHeight && isBodyType && isOccupation && isReligion && isEthnicity ? true : false
    return (
      <ScrollView style={styles.scrollViewContainer}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={0} style={styles.keyboardAvoidingContainer}>
          <View style={styles.body}>
            <ChooseInput
              onChange={this.onFieldChange('height')}
              field='height'
              label={SCREEN.fields.height.title}
              description={SCREEN.fields.height.description}
              row
              values={HEIGHT_RANGE} />
            <ChooseInput
              onChange={this.onFieldChange('bodyType', bodyTypes, gender)}
              value='About Average'
              label={SCREEN.fields.bodyType.title}
              field='bodyTypeIds'
              values={userBodyTypes.map(e => e.type)}
              row />
            <ChooseInput
              onChange={this.onFieldChange('occupation', occupations)}
              field='occupations'
              label={SCREEN.fields.occupation.title}
              multiselect
              values={occupations.map(e => e.occupation)}
              row />
            <ChooseInput
              onChange={this.onFieldChange('religion', religions)}
              label={SCREEN.fields.religion.title}
              field='religionId'
              values={religions.map(e => e.religion)}
              row />
            <ChooseInput
              onChange={this.onFieldChange('ethnicity', ethnicities)}
              multiselect
              field='ethnicityIds'
              values={ethnicities.map(e => e.ethnicity)}
              label={SCREEN.fields.ethnicity.title}
              row />
            <TextArea
              value={about}
              label={SCREEN.fields.about.title}
              onChange={(value) => this.setState({ about: value })}
              row />
            <Button
              style={styles.marginTop}
              text={SCREEN.button}
              color={isFilled ? 'purple' : 'plain'}
              textColor={Colors[isFilled ? 'white' : 'lightGray']}
              onPress={this.onSubmit}
              disabled={!isFilled} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}
