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

import { validLetters } from 'Tools'

import styles from '../UserParamsScreen.style'

export default class AddName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.user.name || '',
      invalid: false
    }
  }
  onChange = (name) => {
    if (validLetters(name)) {
      this.setState({ name, invalid: false })
    } else {
      this.setState({ name, invalid: true })
    }
  }
  onSubmit = () => {
    const { name } = this.state
    const { onSubmit, step, field, user, setUser } = this.props
    if (name !== user.name) {
      setUser({ option: 'name', value: name })
    }
    if (onSubmit) onSubmit(name, field)
  }
  render () {
    const { name, invalid } = this.state
    const isFilled = name && name.length > 0 && !invalid
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.keyboardAvoidingContainer} >
          <View style={styles.body}>
            <Image containerStyle={styles.topIconWrap} style={styles.topIcon} name='userCloud' />
            <Text style={styles.titleText}>{'My first name is'.toUpperCase()}</Text>
            <View style={styles.passwordInfo}>
              <Text style={styles.labelText}>This is how it will appear in Picke.</Text>
            </View>
            <View style={[styles.passwordInput, styles.marginBottom]}>
              <Input
                containerStyle={styles.roundInputContainer}
                style={styles.roundInput}
                autoFocus
                field='name'
                placeholder='First name'
                value={name}
                onChange={this.onChange} />
            </View>
            {invalid ?
              <Text style={styles.errorText}>*Enter alphabets only.</Text>
            : null}
            <Button
              text={Locales.t('continue').toUpperCase()}
              color={isFilled ? 'purple' : 'plain'}
              textColor={isFilled ? Colors.white : Colors.pinkishGray}
              onPress={this.onSubmit}
              disabled={!isFilled}/>
            <View style={{height: 90}} />
          </View>
        </KeyboardAvoidingView>
    )
  }
}
