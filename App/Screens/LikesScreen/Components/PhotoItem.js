import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { Fonts, Images } from 'Themes'
import { FastImage as Image } from 'Components'
import EStyleSheet from 'react-native-extended-stylesheet'

const PhotoItem = ({ user, onOpen, onLike, onDislike }) => (
  <TouchableOpacity
    style={styles.photoItem}
    onPress={onOpen}
  >
    <View style={styles.avatar}>
      <Image
        resizeMode='cover'
        source={{ uri: user.avatar.path }}
        style={styles.avatar} />
      <Image
        resizeMode='stretch'
        source={Images.fadeGradient}
        style={styles.fadeGradient} />
      <View style={styles.userInfo}>
        <Text style={styles.nameText}>
          {user.name}
          <Text style={styles.ageText}>, {user.age}</Text>
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

export default PhotoItem

const styles = EStyleSheet.create({
  photoItem: {
    width: '102%',
    marginLeft: -1,
    marginRight: -1,
    marginTop: -2
  },
  avatar: {
    width: '100%',
    height: '14rem',
    borderRadius: '1rem'
  },
  fadeGradient: {
    position: 'absolute',
    width: '100%',
    height: '14rem',
    borderRadius: '1rem',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  userInfo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '1rem',
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: 'transparent'
  },
  nameText: {
    fontFamily: Fonts.type.neue,
    fontWeight: '500',
    color: '#fff',
    fontSize: '1.1rem',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  ageText: {
    fontWeight: '300'
  }
})
