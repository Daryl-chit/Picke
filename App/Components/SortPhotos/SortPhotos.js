import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Animated
} from 'react-native'

import { equals } from 'ramda'
import { SortableGrid, FastImage as Image } from 'Components'
import { calcRem, rem, Images } from 'Themes'
import styles from './SortPhotos.style'

export default class SortPhotos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemOrder: null,
      animation: new Animated.Value(0),
      dragging: false,
      sortPhotos: this.prepareData(props.photos)
    }
  }

  componentWillReceiveProps (nextProps) {
    const isNew = !equals(this.props.photos, nextProps.photos)
    if (isNew) {
      const newPhotos = this.prepareData(nextProps.photos)
      this.setState({ sortPhotos: newPhotos })
    }
  }

  prepareData = (photos) => {
    const filterPhotos = photos.filter(item => item.source != 'instagram')
    let newPhotos = Object.assign([], filterPhotos)
    newPhotos.sort((a, b) => {
      return a.num < b.num
    })
    return newPhotos.slice(0, 5)
  }

  onPress = (index) => {
    const { onPress } = this.props
    if (onPress) {
      onPress(index)
    }
  }

  deletePhoto = (photo, index) => {
    const { onDelete, deletePhoto } = this.props
    Alert.alert(
      'Delete photo',
      'Are you sure?',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Sure',
          onPress: () => {
            deletePhoto(photo.id)
            if (onDelete) onDelete(photo, index)
          }
        }
      ],
      { cancelable: true }
    )
  }

  renderPhoto = (photo, index) => {
    const { itemOrder, dragging, sortPhotos } = this.state
    const isFirst = itemOrder
      ? parseInt(itemOrder.find(f => f.order === 0).key) === parseInt(index)
      : index === 0
    return (
      <View
        key={index}
        style={[styles.block, isFirst ? styles.firstBlock : {}]}
        onTap={() => this.onPress(index)}
      >
        {!dragging && sortPhotos.length > 1
          ? <TouchableOpacity
            style={styles.deletePhoto}
            onPress={() => this.deletePhoto(photo, index)}
            >
            <Text style={styles.x}>x</Text>
          </TouchableOpacity>
          : null}
        <Image
          source={{ uri: photo.path }}
          style={[styles.photo, isFirst ? styles.firstPhoto : {}]}
          resizeMode='cover'
        />
      </View>
    )
  }

  onDragStart = () => {
    const { onStart } = this.props
    if (onStart) onStart()
    this.setState({ dragging: true })
  }

  onDragRelease = ({ itemOrder }) => {
    const { onRelease } = this.props
    this.setState({
      itemOrder: itemOrder,
      dragging: false
    })
    if (onRelease) onRelease(itemOrder)
  }

  startCustomAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 50,
      duration: 500
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500
      }).start()
    })
  }

  getDragStartAnimation = () => {
    return {
      transform: [
        {
          scaleX: this.state.animation.interpolate({
            inputRange: [0, 150],
            outputRange: [1, -1.5]
          })
        },
        {
          scaleY: this.state.animation.interpolate({
            inputRange: [0, 150],
            outputRange: [1, 1.5]
          })
        }
      ]
    }
  }

  renderAddPhotoButton = () => {
    return (
      <TouchableOpacity
        onPress={this.addPhoto}
        style={[styles.block, styles.addPhotoButton]}
      >
        <Image
          resizeMode='contain'
          style={styles.addPhotoIcon}
          source={Images.cameraAdd}
        />
      </TouchableOpacity>
    )
  }

  render () {
    const { onAdd, onStart, ...etc } = this.props
    const { sortPhotos } = this.state
    return (
      <SortableGrid
        onAdd={onAdd}
        blockTransitionDuration={400}
        activeBlockCenteringDuration={200}
        itemsPerRow={4}
        dragActivationTreshold={350}
        onDragStart={onStart}
        onDragRelease={this.onDragRelease}
        onTap={() => this.onPress()}
        {...etc}
      >
        {sortPhotos.map(this.renderPhoto)}
      </SortableGrid>
    )
  }
}
