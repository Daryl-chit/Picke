import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import { Column as Col, Row } from 'react-native-flexbox-grid'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { Actions } from 'react-native-router-flux'

import { Images, rem } from 'Themes'
import { Input, RoundButton, Header } from 'Components'

import Locales from 'Locales'
import styles from './LoginPhoneScreen.styles'

export default class LoginPhoneScreen extends Component {
  state = {
    countryCode: '+1',
    phone: ''
  }

  onPhoneChange = (value) => {
    this.setState({ phone: value })
  }

  onSubmit = () => {
    const { phone, country } = this.state
    const phoneNumber = `${country}${phone}`
    // console.log(phoneNumber)
  }

  onNext = () => {
    this.onSubmit()
    Actions.LoginPhoneConfirmationScreen
  }

  render () {
    const { countryCode, phone } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.screen}>
        <Header title={Locales.t('loginPhoneScreenTitle').toUpperCase()} />
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.label}>
              {Locales.t('loginPhoneLabel')}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Row>
              <Col sm={4}>
                <View style={[styles.roundInputContainer, styles.country]}>
                  <Image source={Images.usaFlag} style={styles.countryFlag} />
                  <Text style={styles.countryCode}>{countryCode}</Text>
                </View>
              </Col>
              <Col sm={8}>
                <Input
                  containerStyle={styles.roundInputContainer}
                  style={styles.roundInput}
                  keyboardType='numeric'
                  autoFocus
                  value={phone}
                  onChange={this.onPhoneChange} />
              </Col>
            </Row>
          </View>
          <View>
            <Text style={styles.description}>
              {Locales.t('loginPhoneInfo')} <Text style={styles.underline}>{Locales.t('loginPhoneInfoLink')}</Text>
            </Text>
          </View>
          <RoundButton
            style={styles.nextButton}
            onPress={Actions.loginPhoneConfirmationScreen}
            text={Locales.t('next').toUpperCase()} />
          <KeyboardSpacer />
        </View>
      </View>
    )
  }
}
