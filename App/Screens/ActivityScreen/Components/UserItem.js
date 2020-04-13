import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import moment from 'moment'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { FastImage as Image } from 'Components'
import { Fonts, calcRem } from 'Themes'

export default class UserItem extends Component {
  onPress = () => {
    const { user, onPress } = this.props
    if (onPress) onPress(user.id)
  }
  calcTimeAgo = () => {
    const { user, newUser } = this.props

    const lastActivityTime = newUser ? user.sign_up_date : user.last_activity
    const years = moment().diff(moment.utc(lastActivityTime), 'years')
    const months = moment().diff(moment.utc(lastActivityTime), 'months')
    const weeks = moment().diff(moment.utc(lastActivityTime), 'weeks')
    const days = moment().diff(moment.utc(lastActivityTime), 'days')
    const hours = moment().diff(moment.utc(lastActivityTime), 'hours')
    const minutes = moment().diff(moment.utc(lastActivityTime), 'minutes')
    const seconds = moment().diff(moment.utc(lastActivityTime), 'seconds')

    if (years > 0) {
      return `${years} Y`
    } else if (months > 0) {
      return `${months} MO`
    } else if (weeks > 0) {
      return `${weeks} W`
    } else if (days > 0) {
      return `${days} D`
    } else if (hours > 0) {
      return `${hours} H`
    } else if (minutes > 0) {
      return `${minutes} M`
    } else {
      return `${seconds} S`
    }
  }

  renderLastTime () {
    const activityText = this.calcTimeAgo()
    return (
      <View style={s.activity}>
        <Icon
          name='clock'
          size={calcRem(0.8)}
          color='#fff' />
        <Text style={s.activityText}>{activityText}</Text>
      </View>
    )
  }

  render () {
    const { user, noActivity, hideLastTime } = this.props

    const avatar = user.avatar.path ? user.avatar.path : null

    return (
      <TouchableOpacity
        style={s.userItem}
        onPress={avatar ? this.onPress : null}
        activeOpacity={avatar ? 0.8 : 1}>
        {!noActivity && hideLastTime !== true ? this.renderLastTime() : null}
        <View style={s.image}>
          <Image
            resizeMode='cover'
            source={{ uri: user.avatar.path }}
            style={s.avatar}
          />
        </View>
        <Text style={s.nameText} numberOfLines={1}>{user.name}</Text>
      </TouchableOpacity>
    )
  }
}

const s = EStyleSheet.create({
  activity: {
    position: 'absolute',
    right: 0,
    top: 2,
    paddingVertical: '0.1rem',
    paddingHorizontal: '0.2rem',
    backgroundColor: '#be4ab7',
    borderRadius: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    flexDirection: 'row'
  },
  activityText: {
    fontFamily: Fonts.type.neue,
    color: '#fff',
    fontSize: '0.55rem',
    fontWeight: '500',
    marginLeft: '0.1rem',
    marginRight: '0.15rem'
  },
  userItem: {
    width: '91%'
  },
  avatar: {
    width: '100%',
    height: '9.5rem',
    borderRadius: '1rem'
  },
  image: {
    width: '100%',
    height: '9.5rem',
    borderRadius: '1rem',
    backgroundColor: '#ddd',
    marginBottom: '0.3rem'
  },
  nameText: {
    fontFamily: Fonts.type.neue,
    color: '#8e8e8e',
    textAlign: 'center',
    fontSize: '0.8rem'
  }
})
