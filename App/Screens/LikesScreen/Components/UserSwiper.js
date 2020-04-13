import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import { Image } from 'Components'
import { rem, calcRem, Images, calcWidth } from 'Themes'

import {
  AnimatedLoader,
  FastImage,
  SwiperAnimated as Swiper
} from 'Components'

import UserCard from './PhotoItem'

const iconStyle = {
  position: 'absolute',
  top: -(7 * rem),
  width: 9 * rem
}

const LikeIcon = () => <Image style={[iconStyle, { left: rem }]} source={Images.like} />
const DislikeIcon = () => <Image style={[iconStyle, { right: rem }]} source={Images.dislike} />

export default class CardSwiper extends Component {
  constructor (props) {
    super(props)

    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0,
      width: 0
    }
  }

  overlayLabels = () => {
    return {
      left: {
        element: <DislikeIcon />,
        title: 'NOPE',
        style: {
          label: {
            color: 'rgb(238, 40, 27)',
            borderWidth: 2
          },
          wrapper: {
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            marginTop: 30,
            marginLeft: -30
          }
        }
      },
      right: {
        element: <LikeIcon />,
        title: 'LIKE',
        style: {
          label: {
            color: 'rgb(98, 215, 42)'
          },
          wrapper: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: 30,
            marginLeft: 30
          }
        }
      }
    }
  }
  renderCard = (card) => {
    return (card
      ? <View key={'card:' + card.index} style={{ flex: 1, borderWidth: 2 }}>
        {<UserCard {...card} />}
      </View> : <View />)
  }

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false)
        })
      })
    }
  }

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState({ isSwipingBack: isSwipingBack }, cb)
  }

  jumpTo = () => {

  }

  onLeft = (index) => {
    const { cards } = this.props
    this.props.onDislike(cards[0])
  }

  onRight = (index) => {
    this.props.onLike(index)
  }
  render () {
    const { marginBottom, likes, people, cards, loading, ...etc } = this.props
    const { cardIndex } = this.state

    return (
      <View style={styles.container} onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        this.width = width
        this.setState({ width })
      }}>
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiper => {
              this.swiper = swiper
            }}
            backgroundColor='transparent'
            onSwipedLeft={this.onLeft}
            onSwipedRight={this.onRight}
            cards={cards}
            cardIndex={0}
            renderCard={this.renderCard}
            marginBottom={0}
            verticalSwipe={false}
            showSecondCard={false}
            cardVerticalMargin={0}
            cardHorizontalMargin={0} />
        </View>
      </View>
    )
  }
}

// overlayLabels={this.overlayLabels()}
const styles = EStyleSheet.create({
  box1: {
  },
  container: {
  },
  card: {
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#777'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  },
  swipeBackButton: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    bottom: '15%'
  },
  swipeBackIcon: {
    height: '3rem',
    width: '3rem'
  },
  swiperContainer: {
    height: '14rem',
    width: '10.5rem'
  }
})
