import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

import * as Ani from 'react-native-animatable'

import Color from 'color'
import Locales from 'Locales'

import { Metrics, Fonts, Colors, rem } from 'Themes'

import { Image, GradientButton as Button, SelectButton, Input } from 'Components'

import styles from '../UserParamsScreen.style'

export default class AddPassword extends Component {
  state = {
    password: ''
  }
  onSubmit = () => {
    const { password } = this.state
    const { onSubmit, step, field, setUser } = this.props
    setUser({ option: 'password', value: password })
    if (onSubmit) onSubmit(password, field)
  }
  render () {
    const { password } = this.state

    const isFilled = password && password.length > 7
    return (
      <View style={[styles.container]}>
        <View style={styles.body}>
          <Image containerStyle={styles.topIconWrap} style={styles.topIcon} name='password' />
          <Text style={styles.titleText}>{'My password'.toUpperCase()}</Text>
          <View style={styles.passwordInfo}>
            <Text style={styles.labelText}>Password should contain 1 letter, 1 number, and at least 8 characters.</Text>
          </View>
          <View style={[styles.passwordInput, styles.marginBottom]}>
            <Input
              containerStyle={styles.roundInputContainer}
              style={styles.roundInput}
              keyboardType='numeric'
              autoFocus
              secureTextEntry
              placeholder='Password'
              field='password'
              value={password}
              onChange={password => this.setState({ password })} />
          </View>
          <Button
            text={Locales.t('continue').toUpperCase()}
            color={isFilled ? 'purple' : 'plain'}
            textColor={isFilled ? Colors.white : Colors.pinkishGray}
            onPress={this.onSubmit} />
          </View>
      </View>
    )
  }
}
