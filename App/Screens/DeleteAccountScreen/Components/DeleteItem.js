import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import { FastImage } from 'Components'
import { calcHeight, Colors, Images } from 'Themes'
import EStyleSheet from 'react-native-extended-stylesheet'

export default class DeleteItem extends Component {
  onPress = () => {
    const { item, onPress } = this.props
    if (onPress) onPress(item.title)
  }
  render () {
    const { item } = this.props
    return (
      <TouchableOpacity
        style={s.itemButton}
        onPress={this.onPress}>
        <View style={s.itemContainer}>
          <FastImage
            source={item.image}
            style={s.icon}
            resizeMode='contain' />
          <Text style={s.text}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const s = EStyleSheet.create({
  itemButton: {
    width: '91%'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: calcHeight(0.2),
    borderRadius: '1rem',
    marginBottom: '1rem',
    backgroundColor: Colors.white,
    shadowColor: Colors.pinkishGray,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1.5,
    shadowOpacity: 1,
  },
  icon: {
    width: '3rem',
    height: '3rem',
    marginTop: '0.5rem',
    marginBottom: '0.5rem'
  },
  text: {
    color: Colors.purplePink,
    fontSize: '0.8rem',
    width: '50%',
    textAlign: 'center'
  }
})
