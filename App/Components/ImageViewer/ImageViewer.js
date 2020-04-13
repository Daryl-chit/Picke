import React, { Component } from 'react'
import { Modal, View, FlatList, TouchableOpacity, Image, InteractionManager } from 'react-native'
import TransformableImage from 'react-native-transformable-image'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as Ani from 'react-native-animatable'
import { screenWidth, calcWidth, calcHeight, Images, Colors, width, calcRem, IS_IOS } from 'Themes'
import Spinner from 'react-native-spinkit'

export default class ImageViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index: props.initialIndex || 0,
      imageLoaded: false
    }
  }

  componentDidMount () {
    const { index } = this.state
    if (index) {
      InteractionManager.runAfterInteractions(() => {
        this.refs.FlatList.scrollToIndex({
          animated: false,
          index: index
        })
      })
      // setTimeout(() => , 1000)
    }
  }

  perpareImages = () => {
    const { images } = this.props
    let out = []
    images.map((uri, key) => out.push({ key, uri }))
    return out
  }

  renderSpinner () {
    return (
      <View style={s.spinnerContainer}>
        <Spinner
          size={calcRem(2)}
          type={ IS_IOS ? 'Arc' : 'Circle' }
          color={Colors.purplePink}
        />
      </View>
    )
  }

  onLoadTransformableImage = () => {
    this.setState({ imageLoaded: true })
  }

  renderItem = ({ index, item }) => {
    const { uri, key } = item
    return (
      <View key={key} style={s.imageContainer}>
        { !this.state.imageLoaded ? this.renderSpinner() : null }
        <TransformableImage
          source={{ uri: uri }}
          resizeMode='cover'
          style={s.image}
          pixels={{width: calcWidth(3), height: calcHeight(3)}}
          onLoad={this.onLoadTransformableImage}
        />
      </View>
    )
  }

  onClose = () => {
    const { onClose } = this.props
    if (onClose) onClose()
  }

  getItemLayout = (data, index) => {
    return { length: width, offset: width * index, index }
  }

  render () {
    const { open, initialIndex } = this.props
    const images = this.perpareImages()
    return (
      <Modal
        animationType={'slide'}
        visible={open || true}
        onRequestClose={() => {}}
        transparent>
        <Ani.View
          delay={initialIndex ? 500 : null}
          duration={initialIndex ? 300 : null}
          animation={initialIndex ? 'fadeIn' : null}
          style={s.wrap}>
          <TouchableOpacity
            onPress={this.onClose}
            style={s.close}>
            <Image source={Images.close} style={s.closeIcon} />
          </TouchableOpacity>
          <FlatList
            ref='FlatList'
            pagingEnabled
            directionalLockEnabled
            horizontal
            data={images}
            renderItem={this.renderItem}
            getItemLayout={this.getItemLayout}
            extraData={images} />
        </Ani.View>
      </Modal>
    )
  }
}

const s = EStyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#111'
  },
  imageContainer: {
    width: calcWidth(1)
  },
  image: {
    width: calcWidth(1),
    height: calcHeight(1),
    backgroundColor: Colors.black
  },
  close: {
    position: 'absolute',
    top: '2.3rem',
    right: '1.2rem',
    zIndex: 6
  },
  closeIcon: {
    width: '2.5rem',
    height: '2.5rem'
  },
  spinnerContainer: {
    height: '100%',
    width: '100%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
