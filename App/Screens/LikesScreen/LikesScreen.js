import React, { Component } from 'react'
import {
  Easing,
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
  InteractionManager,
  AsyncStorage
} from 'react-native'

import { View as AnimatableView } from 'react-native-animatable'

import { equals } from 'ramda'
import * as Ani from 'react-native-animatable'
import { Actions } from 'react-native-router-flux'

import { PickConfig, LayoutScale, ExpandSpring, LayoutSpring, EaseScale, SpringOpacity } from 'Animations/LayoutAnimation'

import { Column as Col, Row } from 'react-native-flexbox-grid'

import { Header, FastImage as Image, SwipeGestures, Empty } from 'Components'
import { Images, rem } from 'Themes'

import PhotoItem from './Components/PhotoItem'
import UserSwiper from './Components/UserSwiper'
import styles from './LikesScreen.style'
import likeIcon from './like.png'
import dislikeIcon from './dislike.png'
import separatorIcon from './separator.png'

const iconButtonStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: rem / 4
}

const ICON_SIZE = rem * (3 / 2)
/**
 * Fix dislike icon size
 */
const DISLIKE_FIX = ICON_SIZE / 4

const LikeIcon = () =>
  <Image
    style={{
      height: ICON_SIZE,
      width: ICON_SIZE
    }}
    source={likeIcon}
  />

const DislikeIcon = () =>
  <Image
    style={{
      height: ICON_SIZE - DISLIKE_FIX,
      width: ICON_SIZE - DISLIKE_FIX,
      marginTop: DISLIKE_FIX / 2
    }}
    source={dislikeIcon}
  />

const stampStyle = {
  position: 'absolute',
  width: 64,
  height: 64,
  left: 5,
  top: 5,
  zIndex: 999
}

const stampAnimation = {
  easing: Easing.bezier(0.8, 0.04, 0.98, 0.335),
  0: {
    opacity: 0,
    transform: [
      {
        rotate: '-5deg'
      },
      {
        scale: 5
      }
    ]
  },
  1: {
    opacity: 0.75,
    transform: [
      {
        rotate: '-0deg'
      },
      {
        scale: '1'
      }
    ]
  }
}

const Stamp = ({ icon, ...props }) => (
  <AnimatableView
    {...props}
    style={stampStyle}
    delay={500}
    direction='alternate'
    animation={stampAnimation}
  >
    <Image style={stampStyle} source={icon} />
  </AnimatableView>
)

class UserLikeItem extends React.PureComponent {
  state = {
    liked: false,
    disliked: false
  }

  async animatedRemove (onAnimationEnd) {
    await this.animatableView.fadeOut(300)
    onAnimationEnd && onAnimationEnd()
  }

  render () {
    const { user, onOpen, onLike, onDislike } = this.props
    const { liked, disliked } = this.state

    return (
      <AnimatableView
        ref={r => (this.animatableView = r)}
        easing={Easing.bezier(0.6, 0.04, 0.98, 0.535)}
        style={styles.photoItem}
      >
        <View style={{
          width: '90%',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#d7d7d7',
          borderStyle: 'dashed'
        }}>
          {liked && <Stamp icon={Images.like} onAnimationEnd={() => this.animatedRemove(onLike)} />}
          {disliked && <Stamp icon={Images.dislike} onAnimationEnd={() => this.animatedRemove(onDislike, true)} />}
          <PhotoItem user={user} onOpen={onOpen} />
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}>
            <TouchableOpacity
              style={iconButtonStyle}
              onPress={() => this.setState({ liked: false, disliked: true })}
            >
              <DislikeIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={iconButtonStyle}
              onPress={() => this.setState({ liked: true, disliked: false })}
            >
              <LikeIcon />
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                paddingTop: ICON_SIZE / 4
              }}
            >
              <View
                style={{
                  height: 18,
                  width: 2,
                  backgroundColor: '#d7d7d7'
                }}
              />
            </View>
          </View>
        </View>
      </AnimatableView>
    )
  }
}

export default class LikesScreen extends Component {
  state = {
    info: true,
    maxItems: 20
  }

  componentDidMount () {
    AsyncStorage.getItem('UIDLIKE', (err, result) => {
      if (result) {
        const value = JSON.parse(result)
        const val = value.ShowLikeInformation === null
        this.setState({ info: val })
      }
    })
  }

  componentWillUpdate (nextProps, nextState) {
    if (!equals(this.props.usersWhoLikedList, nextProps.usersWhoLikedList)) {
      LayoutAnimation.configureNext(SpringOpacity)
    }
  }

  componentWillReceiveProps (newProps) {

  }

  toggleInfo = () => {
    AsyncStorage.setItem('UIDLIKE', JSON.stringify({'ShowLikeInformation': false}), () => {})
    LayoutAnimation.easeInEaseOut()
    this.setState({ info: false })
  }

  removeUser (user, onAnimationEnd) {
    // this.setState(prevState => ({
    //   toSkip: [...prevState.toSkip, user.id]
    // }))
    onAnimationEnd && onAnimationEnd(user.id)
  }

  onEndReached = () => {
    const { usersWhoLikedList, likedRequest } = this.props
    const { maxItems } = this.state
    const itemsLength = usersWhoLikedList.length
    let count = maxItems + 9
    if (count > itemsLength) count = itemsLength
    if (count < itemsLength) this.setState({ maxItems: count })
    likedRequest()
  }

  renderItem = ({ index, item: user }) => {
    const { like, dislike } = this.props
    return (
      <UserLikeItem
        user={user}
        atRight={index % 2 === 1}
        onOpen={() => Actions.userCardScreen({ userId: user.id, userName: user.name })}
        onLike={() => this.removeUser(user, like)}
        onDislike={() => this.removeUser(user, dislike)}
      />
    )
  }

  render () {
    const { totalWhoLiked, usersWhoLikedList } = this.props
    const { info } = this.state

    const users = usersWhoLikedList
      // .filter(user => !toSkip.includes(user.id))
      // .slice(0, this.state.maxItems)

    if (users.length === 0) {
      return (
        <View style={styles.screen}>
          <Header noBorder title='' />
          <Empty text='No Current Likes' />
        </View>
      )
    } else {
      return (
        <View style={styles.screen}>
          <Header noBorder title={`${totalWhoLiked} LIKES`} />
          {info ? (
            <View style={styles.info}>
              <Text style={styles.infoText}>
                Click the heart to like users. or the X to hide users from this list
              </Text>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={this.toggleInfo}>
                <Text style={styles.toggleText}>
                  {'OK, I understand'.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <FlatList
            data={users}
            renderItem={this.renderItem}
            numColumns={2}
            style={{ width: '100%' }}
            contentContainerStyle={{
              // paddingTop: rem * 1.5,
              // paddingBottom: rem * 2
              paddingTop: rem / 2,
              paddingBottom: rem / 2
            }}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.95}
            keyExtractor={user => user.id}
          />
        </View>
      )
    }
  }
}
