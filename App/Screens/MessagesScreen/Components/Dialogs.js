import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Column as Col, Row } from 'react-native-flexbox-grid'

import { Metrics, Fonts, Colors, Images, calcHeight } from 'Themes'

import { decodeString } from 'Tools'

import {
  AnimatedLoader,
  FastImage as Image
} from 'Components'

export default class Dialogs extends Component {
  renderDialog = (item, key) => {
    const { user, last_message, unread, type } = item
    const { message, created_at } = last_message
    const createdAt = moment(created_at)
    const timeAgo = createdAt.fromNow()
    const isPlus = (type === 'plus')
    return (
      <TouchableOpacity
        onPress={() => this.onItemPress(item)}
        style={s.dialogItem}
        key={key}>
        <View style={s.imageWrap}>
          <Image
            source={{ uri: user.avatar.path }}
            resizeMode='cover'
            style={s.avatar} />
          {unread
          ? <View style={s.new}>
            <Text style={s.newText}>{'New'.toUpperCase()}</Text>
          </View> : null}
        </View>
        <View style={s.dialogContent}>
          <View style={s.name}>
            <Text style={s.nameText}>{user.name}</Text>
            {isPlus
            ? <Image
              source={Images.plus}
              style={s.plusIcon} /> : null}
          </View>
          <Text
            style={s.messageText}
            numberOfLines={2}>{decodeString(message)}</Text>
          <View style={s.timeAgo}>
            <Text style={s.timeAgoText}>{timeAgo}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  onItemPress (item) {
    Actions.chatScreen({
      userId: item.user.id,
      matchId: item.match_id
    })
  }

  render () {
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height
    }
    
    const { dialogs } = this.props
    return (
      <View style={s.container}>
        <ScrollView style={{ height: calcHeight(0.7) }}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              this.props.refresh()
            }
          }}
        >
          <View style={s.list}>
            {dialogs && dialogs.length > 0
              ? dialogs.map(this.renderDialog) : null}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const s = EStyleSheet.create({
  container: {
  },
  list: {
  },
  timeAgo: {
    position: 'absolute',
    right: '0.7rem',
    top: '0.65rem'
  },
  name: {
    flexDirection: 'row'
  },
  plusIcon: {
    width: '2.5rem',
    marginLeft: '0.15rem',
    marginTop: '-0.15rem'
  },
  timeAgoText: {
    fontFamily: Fonts.type.neue,
    color: '#8e8e8e',
    fontSize: '0.75rem',
    fontWeight: '300'
  },
  new: {
    position: 'absolute',
    right: '-0.7rem',
    top: '0.7rem',
    backgroundColor: Colors.purplePink,
    borderRadius: '0.8rem',
    paddingHorizontal: '0.15rem',
    paddingVertical: '0.1rem'
  },
  newText: {
    fontFamily: Fonts.type.neue,
    color: '#fff',
    fontSize: '0.5rem',
    fontWeight: '600'
  },
  dialogContent: {
    flex: 1,
    paddingLeft: '1.1rem',
    paddingRight: '1rem',
    paddingVertical: '0.6rem'
  },
  dialogItem: {
    marginBottom: '0.6rem',
    backgroundColor: '#fff',
    borderRadius: '0.6rem',
    borderTopRightRadius: '0.3rem',
    borderBottomRightRadius: '0.3rem',
    flexDirection: 'row',
  	shadowColor: 'rgba(0, 0, 0, 0.35)',
  	shadowOffset: {
  		width: 0,
  		height: 1
  	},
  	shadowRadius: 1.5,
  	shadowOpacity: 1
  },
  avatar: {
    borderRadius: '0.6rem',
    height: '5rem',
    width: '3.7rem'
  },
  imageWrap: {
    width: '3.7rem'
  },
  nameText: {
    fontFamily: Fonts.type.neue,
    color: '#8e8e8e',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  messageText: {
    fontFamily: Fonts.type.neue,
    color: '#000',
    marginTop: '0.2rem',
    fontSize: '0.9rem',
    paddingRight: '2.5rem',
    lineHeight: '1.15rem'
  }
})
