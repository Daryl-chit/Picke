import React, { Component } from 'react'
import { View, Text } from 'react-native'
import * as Ani from 'react-native-animatable'
import Locales from 'Locales'
import { Metrics, Fonts, Colors, rem } from 'Themes'
import { Image, GradientButton as Button, SelectButton } from 'Components'
import { GENDER, SEX_TYPE } from 'Config/Constants'
import { pushOrRemoveIfExists, capitalizeWords } from 'Utils/Data'
import styles from '../UserParamsScreen.style'

const SCREEN = {
  title: Locales.t('screens.sexualPreference.title').toUpperCase(),
  info: Locales.t('screens.sexualPreference.lookingFor'),
  hint: Locales.t('screens.sexualPreference.hint').toUpperCase(),
  button: Locales.t('continue').toUpperCase()
}

export default class SexualPreference extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sex: props.user.gender || null,
      lookingFor: []
    }
  }

  toggleSex = (value) => {
    this.setState({ sex: value })
  }

  toggleLookingFor = (value) => {
    const { lookingFor } = this.state
    const next = pushOrRemoveIfExists(value, lookingFor)
    this.setState({ lookingFor: next })
  }

  onSubmit = () => {
    const { sex, lookingFor } = this.state
    const { onSubmit, setUser, step, editSettings } = this.props

    if (sex && lookingFor.length > 0) {
      const settingsParams = {}
      if (lookingFor.includes('man')) {
        settingsParams.seekingMan = true
      } else {
        settingsParams.seekingMan = false
      }
      if (lookingFor.includes('woman')) {
        settingsParams.seekingWomen = true
      } else {
        settingsParams.seekingWomen = false
      }
      editSettings(settingsParams)
      setUser({ option: 'gender', value: sex })

      if (onSubmit) onSubmit({ sex, lookingFor, step })
    }
  }

  renderLookingForSection = () => {
    const { lookingFor } = this.state
    const genders = [GENDER.MAN, GENDER.WOMAN]
    return (
      <Ani.View
          useNativeDriver
          easing='ease-in-out-circ'
          duration={500}
          animation='fadeInLeft'
          style={[styles.stretch, styles.center]}>
        <View>
          <Text style={styles.labelText}>{SCREEN.info}</Text>
        </View>
        <View style={[styles.buttons, styles.marginTop]}>
          { genders.map((gender, index) => (
            <SelectButton
              key={index}
              text={capitalizeWords(gender)}
              value={gender}
              onPress={this.toggleLookingFor}
              active={lookingFor.includes(gender)} />
          )) }
        </View>
        <View style={styles.bottomLabel}>
          <Text style={styles.labelTextSmall}>{SCREEN.hint}</Text>
        </View>
      </Ani.View>
    )
  }

  render () {
    const { sex, lookingFor } = this.state
    const isFilled = (sex !== null && lookingFor.length > 0)

    return (
      <View style={[styles.container]}>
        <View style={styles.body}>
          <Image containerStyle={styles.topIconWrap} style={styles.topIcon} name='sex' />
          <Text style={styles.titleText}>{SCREEN.title}</Text>
          <View style={[styles.buttons, styles.sexButtons]}>
            <SelectButton
              text='Man'
              value={SEX_TYPE.MALE}
              onPress={this.toggleSex}
              active={sex === SEX_TYPE.MALE} />
            <SelectButton
              text='Woman'
              value={SEX_TYPE.FEMALE}
              onPress={this.toggleSex}
              active={sex === SEX_TYPE.FEMALE} />
          </View>
          {sex && this.renderLookingForSection()}
        </View>
        <View style={[styles.bottomButton, styles.body]}>
          <Button
            text={SCREEN.button}
            color={isFilled ? 'purple' : 'plain'}
            textColor={Colors[isFilled ? 'white' : 'lightGray']}
            onPress={this.onSubmit} />
        </View>
      </View>
    )
  }
}
