import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import EStyleSheet from 'react-native-extended-stylesheet'

import { Fonts, Colors } from 'Themes'

import { FastImage as Image } from 'Components'

export default class MatchedUsers extends Component {
  renderUser = (item, key) => {
    const { user, new_match } = item
    const { name, avatar } = user

    const newMatchIndicator = new_match === '1'
    ? <View style={s.indicator} /> : null

    return (
      <TouchableOpacity
        onPress={() => this.onItemPress(item)}
        style={s.userItem}
        key={key}>
        <Image
          source={{ uri: avatar.path }}
          resizeMode='cover'
          style={s.avatar} />
        <Text style={s.nameText}>{name}</Text>
        {newMatchIndicator}
      </TouchableOpacity>
    )
  }
  onItemPress (item) {
    Actions.viewMatchScreen({ userId: item.user.id, matchId: item.match_id })
  }
  render () {
    const { users } = this.props
    return (
      <View style={s.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={s.matchedUsersList}>
            {users && users.length > 0 ? users.map(this.renderUser) : null}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const s = EStyleSheet.create({
  container: {
    marginLeft: '0.7rem'
  },
  matchedUsersList: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  userItem: {
    marginRight: '0.42rem'
  },
  avatar: {
    borderRadius: '0.6rem',
    height: '5rem',
    width: '3.7rem'
  },
  nameText: {
    marginTop: '0.2rem',
    fontFamily: Fonts.type.neue,
    color: '#8e8e8e',
    fontSize: '0.7rem'
  },
  indicator: {
    position: 'absolute',
    top: '0.5rem',
    right: '-0.3rem',
    width: '0.6rem',
    height: '0.6rem',
    backgroundColor: Colors.purplePink,
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: '1rem'
  }
})
