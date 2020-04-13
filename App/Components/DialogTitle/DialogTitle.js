import React, { Component } from 'react'
import {
  View,
  Image,
  Text
} from 'react-native'

import styles from './DialogTitle.style'

const DialogTitle = ({ user }) => {
  if (user && user.name) {
    const { name, photos } = user
    const image = photos && photos.length > 0 ? photos[0].path : ''
    return (
      <View style={styles.title}>
        <Image
          source={{ uri: image }}
          style={styles.titleIcon}
          resizeMode='cover' />
        <Text style={styles.titleText}>{name}</Text>
      </View>
    )
  }
  return <View />
}

export default DialogTitle
