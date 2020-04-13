import PropTypes from 'prop-types'
import React from 'react'
import { Modal, Image, TouchableOpacity, View, ViewPropTypes, Text } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import CameraRollPicker from 'react-native-camera-roll-picker'
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

import compressImage from 'Tools/CompressImage'
import ImagePicker from 'Tools/ImagePicker'
import { isX } from 'Tools'
import { Images } from 'Themes'

export default class CustomActions extends React.Component {
  constructor (props) {
    super(props)
    this._images = []
    this.state = {
      modalVisible: false
    }
    this.onActionsPress = this.onActionsPress.bind(this)
    this.selectImages = this.selectImages.bind(this)
  }

  setImages (images) {
    this._images = images
  }

  getImages () {
    return this._images
  }

  setModalVisible (visible = false) {
    this.setState({ modalVisible: visible })
  }

  pickImages = () => {
    ImagePicker(base64Image => {
      let images = []
      base64Image && images.push({
        image: base64Image
      })
      this.props.onSend(images)
    })
  }

  onActionsPress = () => {
    const options = [
      'Choose From Library',
      // 'Send Location',
      'Cancel'
    ]
    const cancelButtonIndex = options.length - 1
    this.context.actionSheet().showActionSheetWithOptions({ options, cancelButtonIndex },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.setModalVisible(true)
            break
          // case 1:
          //   navigator.geolocation.getCurrentPosition(
          //     (position) => {
          //       this.props.onSend({
          //         location: {
          //           latitude: position.coords.latitude,
          //           longitude: position.coords.longitude
          //         }
          //       })
          //     },
          //     (error) => console.log('geolocation err', error.message),
          //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          //   )
          //   break
          default:
        }
      })
  }

  selectImages = (images) => {
    this.setImages(images)
  }

  processImages = () => {
    this.setModalVisible(false)
    const { onSend } = this.props
    this.getImages().map((image) => {
      image && compressImage(image.uri, (path, data) => {
        onSend([{
          image: path,
          data
        }])
      })
    })
    this.setImages([])
  }

  renderNavBar () {
    return (
      <NavBar style={{ statusBar: { backgroundColor: '#FFF', marginTop: isX ? 16 : 0 }, navBar: { backgroundColor: '#FFF' } }}>
        <NavButton onPress={() => {
          this.setModalVisible(false)
        }}>
          <NavButtonText style={{ color: '#000' }}>
            {'Cancel'}
          </NavButtonText>
        </NavButton>
        <NavTitle style={{ color: '#000' }}>
          {'Camera Roll'}
        </NavTitle>
        <NavButton onPress={this.processImages}>
          <NavButtonText style={{ color: '#000' }}>
            {'Send'}
          </NavButtonText>
        </NavButton>
      </NavBar>
    )
  }

  renderIcon () {
    return (
      <View style={[styles.wrapper, this.props.wrapperStyle]}>
        <View
          style={styles.touchable}>
          <Image
            source={Images.addPhoto}
            style={[styles.icon, styles.leftIcon]} />
        </View>
      </View>
    )
  }

  render () {
    return (
      <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={this.onActionsPress}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}>
          {this.renderNavBar()}
          <CameraRollPicker
            maximum={10}
            imagesPerRow={4}
            callback={this.selectImages}
            selected={[]} />
        </Modal>
        {this.renderIcon()}
      </TouchableOpacity>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    marginLeft: '0.2rem'
  },
  wrapper: {
    flex: 1
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  leftIcon: {
    width: '2.1rem',
    height: '1.6rem',
    marginLeft: '0.7rem'
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  icon: {
  }
})

CustomActions.contextTypes = {
  actionSheet: PropTypes.func
}

CustomActions.defaultProps = {
  onSend: () => {
  },
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {}
}

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  icon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style
}
