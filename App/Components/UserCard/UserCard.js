import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'
import { Column as Col, Row } from 'react-native-flexbox-grid'
import * as Ani from 'react-native-animatable'

import { LayoutSpring } from 'Animations/LayoutAnimation'

import {
  ImageSlider,
  MessageInputPlus,
  SwipeGestures,
  ImageViewer,
  SubscriptionModal
} from 'Components'

import { calcWidth, Images } from 'Themes'
import { isX, getFeetsDisplayByFloat, capitalize } from 'Tools'
import styles from './UserCard.style'

export default class UserCard extends Component {
  state = {
    width: null,
    height: null,
    keyboard: false,
    showImages: false,
    initialIndex: 0
  }

  openModal = () => {
    this.refs.modal.open()
  }

  nextPhoto = () => {
    this.refs.slider.next()
  }

  toggleKeyboard = keyboard => {
    LayoutAnimation.configureNext(LayoutSpring)
    this.setState({ keyboard })
  }

  setBusy = () => {
    const { onBusy } = this.props
    if (onBusy) onBusy()
  }

  setFree = () => {
    const { onFree } = this.props
    if (onFree) onFree()
  }

  zoomImage = index => {
    this.setBusy()
    this.setState({ showImages: true, initialIndex: index })
  }

  closeImage = () => {
    this.setFree()
    this.setState({ showImages: false })
  }

  onSwipeDown (state) {
    // console.log('onSwipeDown', state)
  }

  renderImageViewer = () => {
    const { photos, photo } = this.props
    const { initialIndex } = this.state
    let userPhotos = null
    if (photos && photos.length > 0) {
      userPhotos = photos ? photos.filter((f, i) => i <= 5) : null
    } else if (photo) {
      userPhotos = [photo]
    }
    if (userPhotos && userPhotos.length > 0) {
      return <ImageViewer onClose={this.closeImage} images={userPhotos} initialIndex={initialIndex}/>
    } else {
      return null
    }
  }

  renderIconButton () {
    return (
      <TouchableOpacity
        style={styles.messageInputPlus}
        onPress={this.openModal}>
        <Image
          resizeMode='contain'
          source={Images.messagePlus}
          style={styles.messageIcon} />
      </TouchableOpacity>
    )
  }

  renderPlusInputIcon () {
    const {
      id,
      name,
      offsetY,
      messagePlus,
      showMoreIcon,
      closeModal
    } = this.props
    const { keyboard } = this.state
    const messageStyles = [
      styles.messageInputPlus,
      // why its not in styles.js file??
      keyboard && isX
          ? {
            position: 'absolute',
            bottom: showMoreIcon
                ? 230 - offsetY < 20 ? 20 : 230 - offsetY
                : 300 - offsetY < 20 ? 20 : 300 - offsetY
          }
          : keyboard && !isX
              ? {
                position: 'absolute',
                bottom: showMoreIcon
                    ? 170 - offsetY < 20 ? 20 : 170 - offsetY
                    : 200 - offsetY < 20 ? 20 : 200 - offsetY
              }
              : {}
    ]
    if (messagePlus && messagePlus === true) {
      return (
        <MessageInputPlus
          style={messageStyles}
          name={name}
          userId={id}
          closeModal={closeModal}
        />
      )
    } else return this.renderIconButton()
  }

  renderMainView () {
    const {
      id,
      photo,
      name,
      age,
      milesAway,
      height,
      zodiac,
      education,
      religion,
      bodyType,
      photos,
      onBottomPress,
      userMoreOpen,
      showMoreIcon,
      blockedUser
    } = this.props
    const { keyboard } = this.state

    let userPhotos = null
    if (photos && photos.length > 0) {
      userPhotos = photos ? photos.filter((f, i) => i <= 5) : null
    } else if (photo) {
      userPhotos = [photo]
    }

    return (
      <View style={styles.photoCard} onPress={this.nextPhoto}>
        {userPhotos && userPhotos.length > 0
          ? <ImageSlider
            slideWidth={calcWidth(0.96)}
            onCenterPress={this.zoomImage}
            images={userPhotos}
            ref='slider' />
          : null}
        {this.props.id !== this.props.ownerID && blockedUser !== 1 ? this.renderPlusInputIcon() : null}
        <TouchableOpacity
          onPress={() => onBottomPress ? onBottomPress(id) : null}
          activeOpacity={onBottomPress ? 0.8 : 1}
          style={styles.userInfo}>
          {!keyboard
            ? <View>
              <View style={styles.userName}>
                <Text style={styles.userNameText}>
                  {`${name}, `}
                  {parseInt(age) > 0
                  ? <Text style={styles.userAgeText}>
                    {age}
                  </Text>
                  : null}
                </Text>
                <Text style={styles.userDistanceText}>
                  {milesAway} miles away
                </Text>
              </View>
              <View style={styles.userDescContainer}>
                <Row>
                  <Col sm={4}>
                    <View style={styles.userDesc}>
                      {parseInt(height) > 0
                        ? <Text style={styles.userDescText}>
                          {getFeetsDisplayByFloat(height)}
                        </Text> : null}
                      <Text numberOfLines={1} style={styles.userDescText}>
                        {bodyType}
                      </Text>
                    </View>
                  </Col>
                  <Col sm={showMoreIcon ? 6 : 8}>
                    <View style={styles.userDesc}>
                      <Text numberOfLines={1} style={styles.userDescText}>
                        {capitalize(zodiac)}
                      </Text>
                      <Text numberOfLines={1} style={styles.userDescText}>
                        {religion}
                      </Text>
                    </View>
                  </Col>
                </Row>
              </View>
              {!userMoreOpen & showMoreIcon
                  ? <Ani.View
                    style={styles.moreIcon}
                    animation='zoomIn'
                    easing='ease-in-out-quint'
                    >
                    <Image
                      resizeMode='contain'
                      source={isX ? Images.userMoreBlack : Images.userMore}
                      style={styles.icon}
                      />
                  </Ani.View>
                  : null}
            </View>
            : null}
          <KeyboardSpacer onToggle={this.toggleKeyboard} />
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const { showImages } = this.state
    return (
      <View
        style={styles.container}
        onLayout={event => {
          const { width, height } = event.nativeEvent.layout
          this.setState({ width, height })
        }}>
        {showImages ? this.renderImageViewer() : null}
        {this.renderMainView()}
        <SubscriptionModal
          subscriptionLog={this.props.subscriptionLog}
          subscriptionRequest={this.props.subscriptionRequest}
          startIndex={3}
          ref='modal' />
      </View>
    )
  }
}
