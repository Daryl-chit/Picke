import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

import moment from 'moment'
import { FastImage } from 'Components'
import { Images } from 'Themes'
import { decodeString } from 'Tools'
import { convertUTCtoLocal } from 'Utils/Time'

import styles from '../Dialogs.style'

export default class DialogItem extends PureComponent {
  render () {
    const { image, userId, data, onItemPress } = this.props
    const { item, index } = data
    const key = index

    const { user, last_message, unread, type } = item
    const { message, created_at, user_id } = last_message

    const createdAt = convertUTCtoLocal(created_at)
    const timeAgo = moment(createdAt).fromNow()
    const isPlus = (type === 'plus')
    const isUnread = parseInt(unread) > 0

    // last_message.message_item_path && console.log('IMAGE IMAGE IMAGE #####')

    const isMe = (userId === user_id)

    const avatar = user && user.avatar && user.avatar.thumbs && user.avatar.thumbs.length > 0 ? user.avatar.thumbs[0] : ''

    return (
      <TouchableOpacity
        onPress={() => onItemPress(item)}
        style={styles.dialogItem}>
        <View style={styles.imageWrap}>
          <FastImage
            resizeMode='cover'
            source={{ uri: avatar }}
            style={styles.avatar} />
          {isUnread
          ? <View style={styles.new}>
            <Text style={styles.newText}>{'New'.toUpperCase()}</Text>
          </View> : null}
        </View>
        <View style={styles.dialogContent}>
          <View style={styles.name}>
            <Text style={styles.nameText}>{user.name}</Text>
            {isPlus
            ? <Image
              resizeMode='contain'
              source={Images.plus}
              style={styles.plusIcon} /> : null}
          </View>
          <View style={styles.timeAgo}>
            <Text style={styles.timeAgoText}>{timeAgo}</Text>
          </View>
          <View style={styles.messageWrap}>
            {isMe
            ? <Image
              resizeMode='contain'
              source={Images.arrowUp}
              style={styles.arrowUpIcon} /> : null}
            {image
              ? (
                <Text
                  style={[styles.messageText, image && { fontStyle: 'italic' }]}>
                  {isMe ? 'Image sent' : 'Image received'}
                </Text>
              )
              : (
                <Text
                  style={styles.messageText}
                  numberOfLines={2}
                >
                  {decodeString(message)}
                </Text>
              )
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
