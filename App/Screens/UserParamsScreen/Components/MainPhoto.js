import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Locales from 'Locales'
import { Metrics, Fonts, Colors, rem } from 'Themes'
import { Image, GradientButton as Button, LoaderOverlay } from 'Components'
import { Column as Col, Row } from 'react-native-flexbox-grid'
import ImagePicker from 'react-native-image-crop-picker'
import { IMAGE_PICKER_CONFIG } from "Config/Constants"
import compressImage from 'Tools/CompressImage'
import styles from '../UserParamsScreen.style'

const SCREEN = {
  fields: {
    photo: {
      title: Locales.t('screens.mainPhoto.fields.photo.title').toUpperCase()
    },
    camera: {
      title: Locales.t('screens.mainPhoto.fields.camera.title').toUpperCase()
    },
  },
  info: Locales.t('screens.mainPhoto.info'),
  title: Locales.t('screens.mainPhoto.title').toUpperCase(),
  button: Locales.t('continue').toUpperCase()
}

const FILLED_IN = true
const IMAGE_PICKER_METHOD = { photo: 'openPicker', camera: 'openCamera' }

export default class MainPhoto extends Component {
  state = {
    photo: null,
    photoURL: null
  }

  componentWillReceiveProps (nextProps) {
    if (this.props && nextProps) {
      const { user } = this.props
      const { user: nextUser } = nextProps
      if (!user.photoUpload.loaded && nextUser.photoUpload.loaded) {
        this.onSubmit()
      }
    }
  }

  onSubmit = () => {
    const { photo } = this.state
    const { onSubmit, field } = this.props
    if (!!photo) {
      if (onSubmit) onSubmit(photo, field)
    }
  }

  onImagePick = (method) => {
    return () => {
      const { addPhoto } = this.props
      ImagePicker[method](IMAGE_PICKER_CONFIG).then(photo => {
        compressImage(photo.path, photo => {
          addPhoto(photo)
        })
        this.setState({ photo, photoURL: photo.sourceURL })
      })
    }
  }

  render () {
    const { user: { photoUpload: { loading }}} = this.props
    const isFilled = !!this.state.photo
    return (
      <View style={[styles.container]}>
        {loading && <LoaderOverlay />}
        <View style={styles.photoBody}>
          <View style={styles.mainPhotoContainer}>
            <Text style={styles.photoText}>
              {SCREEN.title}
            </Text>
            <View style={styles.photoButtons}>
              <Row>
                <Col sm={6}>
                  <TouchableOpacity onPress={this.onImagePick(IMAGE_PICKER_METHOD.camera)} style={styles.photoButton}>
                    <Image
                      name='camera'
                      style={styles.photoIcon}
                      containerStyle={{ height: 'auto' }} />
                    <Text style={styles.iconText}>{SCREEN.fields.camera.title}</Text>
                  </TouchableOpacity>
                </Col>
                <Col sm={6}>
                  <TouchableOpacity onPress={this.onImagePick(IMAGE_PICKER_METHOD.photo)} style={styles.photoButton}>
                    <Image
                      name='photo'
                      containerStyle={{ height: 'auto' }}
                      style={styles.photoIcon} />
                    <Text style={styles.iconText}>{SCREEN.fields.photo.title}</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            </View>
            <View style={styles.photoInfo}>
              <Text style={styles.photoInfoText}>{SCREEN.info}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <Button
            style={styles.marginTop}
            text={SCREEN.button}
            color={isFilled ? 'purple' : 'plain'}
            textColor={Colors[isFilled ? 'white' : 'lightGray']}
            onPress={this.onSubmit} />
        </View>
      </View>
    )
  }
}
