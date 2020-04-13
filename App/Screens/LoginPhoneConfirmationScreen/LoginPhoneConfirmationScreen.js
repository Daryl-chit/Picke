import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import { Actions } from 'react-native-router-flux'

import { Column as Col, Row } from 'react-native-flexbox-grid'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import { Images, Fonts, Colors, rem, Metrics } from 'Themes'
import { Input, RoundButton, GradientButton, ConfirmationCodeInput as CodeInput, Header } from 'Components'

import Locales from 'Locales'

import styles from './LoginPhoneConfirmationScreen.styles'

export default class LoginPhoneConfirmationScreen extends Component {
  state = {
    confirmationCode: ''
  }

  onCodeChange = (code) => {
    // console.log('onChange', code)
    this.setState({ confirmationCode: code })
  }

  didntGetACode = () => {

  }

  onContinue = () => {
    Actions.userParamsScreen()
  }

  render () {
    const { confirmationCode } = this.state
    const { navigation } = this.props

    const isFilled = (confirmationCode.length === 6)

    const phone = '+1234567890'

    return (
      <View style={styles.screen}>
        <Header
          navigation={navigation}
          title={Locales.t('phoneConfirmationScreenTitle').toUpperCase()} />
        <View style={styles.mainContainer}>
          <View style={styles.center}>
            <Text style={styles.label}>
              {Locales.t('phoneConfirmationScreenText')}
            </Text>
            <Text style={[styles.label, styles.phone]}>{phone}</Text>
          </View>
          <View style={[styles.codeInputContainer, styles.marginBottom]}>
            <CodeInput
              keyboardType='numeric'
              codeLength={6}
              className={'border-circle'}
              onChange={confirmationCode => this.setState({ confirmationCode })}
              onFulfill={confirmationCode => this.setState({ confirmationCode })}
              autoFocus
              space={0.25 * rem}
              codeInputStyle={styles.codeInput} />
          </View>
          <GradientButton
            text={Locales.t('continue').toUpperCase()}
            color={isFilled ? 'purple' : 'plain'}
            textStyle={{ fontWeight: '400', color: isFilled ? Colors.white : Colors.pinkishGray }}
            onPress={this.onContinue} />
          <TouchableOpacity
            onPress={this.didntGetACode}
            style={styles.purpleLink}>
            <Text style={styles.purpleLinkText}>
              {Locales.t('didntGetACode').toUpperCase()}
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.description}>
              {Locales.t('phoneConfirmationInfo')}
            </Text>
          </View>
          <KeyboardSpacer />
        </View>
      </View>
    )
  }
}
