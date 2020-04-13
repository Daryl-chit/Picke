import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import moment from 'moment'
import Locales from 'Locales'
import { Metrics, Fonts, Colors, rem } from 'Themes'
import { Image, GradientButton as Button, SelectButton, MaskedInput } from 'Components'
import { MIN_ACCEPTED_AGE, MAX_ACCEPTED_AGE } from 'Config/Constants'
import { GENERAL_DATE_FORMAT, USER_DATE_FORMAT } from 'Config/Constants'
import styles from '../UserParamsScreen.style'

const SCREEN = {
  title: Locales.t('screens.addBirthday.title').toUpperCase(),
  info: Locales.t('screens.addBirthday.info'),
  button: Locales.t('continue').toUpperCase()
}

export default class AddBirthday extends Component {
  constructor (props) {
    super(props)
    const date = props.user.dob ? moment(props.user.dob, GENERAL_DATE_FORMAT).format(USER_DATE_FORMAT) : null
    this.state = {
      birthday: date ? date : '',
      validBirthday: false
    }
    this.elements = { dobField: null }
  }

  isValid () {
    if (this.elements.dobField) {
      return this.elements.dobField.isValid()
    } else {
      return false
    }
	}

	onSubmit = () => {
    const { validBirthday } = this.state
    if (!this.isValid() || !validBirthday) return

    const { onSubmit, field, setUser, user } = this.props

    const date = this.elements.dobField.getRawValue()
    const value = moment(date).format(GENERAL_DATE_FORMAT)
    const years = moment().diff(value, 'years')

    if (years >= MIN_ACCEPTED_AGE && years <= MAX_ACCEPTED_AGE) {
      if (user.dob !== value) setUser({ option: 'dob', value })
      if (onSubmit) onSubmit(value, field)
    }
  }

  handleChange = (text) => {
    if (this.isValid()) {
      const date = this.elements.dobField.getRawValue()
      this.setState({ birthday: text, validBirthday: this.isValidBirthday(date) })
    } else {
      this.setState({ birthday: text })
    }
  }

  isValidBirthday = (date) => {
    const value = moment(date).format(GENERAL_DATE_FORMAT)
    const years = moment().diff(value, 'years')
    if (years >= MIN_ACCEPTED_AGE && years <= MAX_ACCEPTED_AGE) {
      return true
    } else {
      return false
    }
  }

  render () {
    const { birthday, validBirthday } = this.state
    const isFilled = this.isValid() && validBirthday

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.keyboardAvoidingContainer}>
          <View style={styles.body}>
            <Image containerStyle={styles.topIconWrap} style={styles.topIcon} name='date' />
            <Text style={styles.titleText}>{SCREEN.title}</Text>
            <View style={styles.passwordInfo}>
              <Text style={styles.labelText}>{SCREEN.info}</Text>
            </View>
            <View style={[styles.passwordInput, styles.marginBottom]}>
              <View style={styles.roundInputContainer}>
                <TextInputMask
                  ref={(el) => (this.elements.dobField = el)}
                  options={{
                    format: USER_DATE_FORMAT
                  }}
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={this.handleChange}
                  underlineColorAndroid='transparent'
                  placeholderTextColor={Colors.pinkishGray}
                  style={styles.roundInput}
                  type={'datetime'}
                  placeholder={USER_DATE_FORMAT}
                  autoFocus
                  value={birthday} />
              </View>
              {this.isValid() && !validBirthday ?
                <Text style={[styles.errorText, {marginTop: 10, marginLeft: 10}]}>*Age should be from 18 to 88.</Text>
              : null}
            </View>
            <Button
              text={SCREEN.button}
              color={isFilled ? 'purple' : 'plain'}
              textColor={Colors[isFilled ? 'white' : 'lightGray']}
              onPress={this.onSubmit} />
            <View style={{height: 90}} />
          </View>
        </KeyboardAvoidingView>
    )
  }
}
