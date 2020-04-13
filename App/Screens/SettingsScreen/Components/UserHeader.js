import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Ani from 'react-native-animatable'
import { Actions } from 'react-native-router-flux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FastImage as Image } from 'Components'
import { Colors, Fonts, Images } from 'Themes'
import { buildUserAvatar } from 'Utils/User'

export default class UserHeader extends Component {
  editProfile () {
    Actions.editProfileScreen()
  }

  render () {
    const { user } = this.props
    const avatarUrl = buildUserAvatar(user)

    const { userInfo } = user
    let isPlus = false
    if (userInfo !== null) {
      const { godUser, plusMember } = userInfo
      isPlus = (godUser || plusMember === '1')
    }

    return (
      <View style={[s.container]}>
        <View style={s.card}>
          <View style={s.avatar}>
            <Image
              source={{ uri: avatarUrl }}
              style={s.avatarImage}
              resizeMode='cover' />
          </View>
          <View style={s.content}>
            <View style={s.row}>
              <Text style={s.nameText}>
                {user.name}<Text style={s.ageText}>, {user.age}</Text>
              </Text>
              {!isPlus
              ? <TouchableOpacity
                onPress={this.props.openModal}
                style={s.plusOff}>
                <Image
                  source={Images.plusOff}
                  style={s.plusOffIcon} />
              </TouchableOpacity>
              : <View style={s.plus}>
                <Image
                  source={Images.plusOn}
                  style={s.plusIcon} />
              </View>}
            </View>
            <TouchableOpacity
              onPress={() => this.editProfile()}
              style={s.edit}>
              <Ani.Text ref='link' style={s.editText}>
                {'Edit Profile'.toUpperCase()}
              </Ani.Text>
              <Image
                source={Images.edit}
                style={s.editIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const s = EStyleSheet.create({
  container: {
    // width: '100%',
    paddingTop: '0.4rem',
    paddingHorizontal: '0.8rem'
  },
  card: {
    flexDirection: 'row'
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarImage: {
    height: '3.9rem',
    width: '3.1rem',
    borderRadius: '0.4rem'
  },
  content: {
    flex: 1,
    paddingLeft: '0.85rem'
  },
  name: {

  },
  nameText: {
    fontFamily: Fonts.type.base,
    fontWeight: '500',
    color: '#000',
    fontSize: '1.3rem'
  },
  ageText: {
    fontWeight: '300'
  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  editText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: '#979797',
    fontSize: '0.8rem'
  },
  editIcon: {
    height: '0.7rem',
    width: '0.7rem',
    marginLeft: '0.3rem'
  },
  plus: {
    position: 'absolute',
    right: '-1.5rem',
    top: '-0.7rem'
  },
  plusIcon: {
    height: '2.6rem',
    marginTop: '0.3rem'
  },
  plusOff: {
    position: 'absolute',
    right: '-1.5rem',
    top: '-0.45rem',
    overflow: 'visible'
  },
  plusOffIcon: {
    height: '2rem',
    marginTop: '0.6rem'
  },
  row: {
    width: '100%',
    paddingBottom: '0.6rem',
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    marginBottom: '0.3rem'
  }
})
