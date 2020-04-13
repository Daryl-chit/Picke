import React, { Component } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native'

import * as Ani from 'react-native-animatable'

import Color from 'color'
import Locales from 'Locales'

import { Metrics, Fonts, Colors, rem } from 'Themes'

import { Image, GradientButton as Button, SelectButton, Input } from 'Components'

import { validEmail } from 'Tools'

import styles from '../UserParamsScreen.style'

export default class AddEmail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: props.user.email || '',
      invalid: false
    }
  }
  onChange = (email) => {
    if (validEmail(email)) {
      this.setState({ email, invalid: false })
    } else {
      this.setState({ email, invalid: true })
    }
  }
  onSubmit = () => {
    const { email, invalid } = this.state
    const isFilled = email && email.length > 0 && !invalid
    if (!isFilled) {
      return
    }
    const { onSubmit, step, field, user, setUser } = this.props
    if (email !== user.email) {
      setUser({ option: 'email', value: email })
    }
    if (onSubmit) onSubmit(email, field)
  }
  render () {
    const { email, invalid } = this.state
    const isFilled = email && email.length > 0 && !invalid
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.keyboardAvoidingContainer} >
          <View style={styles.body}>
            <Image containerStyle={styles.topIconWrap} style={styles.topIcon} name='email' />
            <Text style={styles.titleText}>{'My email is'.toUpperCase()}</Text>
            <View style={styles.passwordInfo}>
              <Text style={styles.labelText}>Please enter your email to be notified when you receive emails from members:</Text>
            </View>
            <View style={[styles.passwordInput, styles.marginBottom]}>
              <Input
                containerStyle={styles.roundInputContainer}
                style={styles.roundInput}
                autoFocus
                field='email'
                placeholder='xxxxx@xxxxxx.xxx'
                value={email}
                type={'email-address'}
                onChange={this.onChange} />
            </View>
            <Button
              text={Locales.t('continue').toUpperCase()}
              color={isFilled ? 'purple' : 'plain'}
              textColor={isFilled ? Colors.white : Colors.pinkishGray}
              onPress={this.onSubmit} />
            <View style={{height: 90}} />
          </View>
        </KeyboardAvoidingView>
    )
  }
}
