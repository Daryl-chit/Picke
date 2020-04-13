import React, { Component } from 'react'
import { View} from 'react-native'
import moment from 'moment'
import Locales from 'Locales'
import { calcRem, calcWidth, calcHeight } from 'Themes'
import { GradientButton as Button } from 'Components'
import { Actions } from 'react-native-router-flux'
import { Column as Col, Row } from 'react-native-flexbox-grid'
import UserCardGradient from 'Components/UserCardGradient'
import { buildUserAvatar, getUserAge } from 'Utils/User'
import styles from '../UserParamsScreen.style'

const SCREEN = {
  button: Locales.t('done').toUpperCase()
}

export default class YouAreDone extends Component {
  onSubmit = () => {
    Actions.replace('mainScreen')
  }

  buildUserCartParams = ({ user, photo }) => {
    const age = getUserAge(user)
    const userPhoto = photo && photo.path ? photo.path : buildUserAvatar(user)
    return {
      photo: userPhoto,
      name: user.name,
      age,
      milesAway: 0,
      height: user.height,
      education: user.educations.join(', '),
      religion: user.religion,
      bodyType: user.bodyTypes.join(', '),
    }
  }

  render () {
    const { user, photo } = this.props
    const params = this.buildUserCartParams({ user, photo })
    return (
      <View style={[styles.container, { paddingBottom: calcRem(1.5), paddingTop: calcRem(0.5) }]}>
        <View style={{ paddingHorizontal: calcRem(1), width: calcWidth(1.03), height: calcHeight(0.77) }}>
          <UserCardGradient {...params} />
        </View>
        <View style={[styles.body, { marginTop: calcRem(1) }]}>
          <Button
            text={SCREEN.button}
            color={'purple'}
            textColor={'#fff'}
            onPress={this.onSubmit} />
        </View>
      </View>
    )
  }
}
