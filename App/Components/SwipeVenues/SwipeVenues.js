import React, { Component } from 'react'
import { View, Image } from 'react-native'

import { rem, calcHeight, Images, IS_IOS } from 'Themes'

import { SwiperAnimated as Swiper, VenueDetails, ImageViewer } from 'Components'

import { isX } from 'Tools'

import styles from './SwipeVenues.style'

import * as R from 'ramda'

export default class SwipeVenues extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cards: props.cards || ['1', '2', '3'],
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0,
      width: 0,
      enableSwipe: true
    }
  }

  renderCard = (venue) => {
    const { favourites, addFavourite, removeFavourite } = this.props
    if (venue) {
      const currentCard = venue
      const venueId = currentCard.id
      const isActive = (favourites.find(f => f.id === currentCard.id) || false)
      const props = {
        isActive,
        venueId,
        venue,
        addFavourite,
        removeFavourite
      }
      return (
        venue ? <View style={styles.card} key={venue.id}>
          <VenueDetails
            onBusy={this.disableSwipe}
            onFree={this.enableSwipe}
            {...props} />
        </View> : <View />
      )
    } else return <View />
  }

  enableSwipe = () => {
    this.setState({ enableSwipe: true })
  }

  disableSwipe = () => {
    this.setState({ enableSwipe: false })
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
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
    this.swiper.swipeLeft()
  }

  onSwipe = index => {
    const { cards } = this.state
    let indexN = index + 1
    if (indexN > cards.length - 1) { indexN = 0 }
    this.setState({ cardIndex: indexN })
  }

  render () {
    const { marginBottom, cards, ...etc } = this.props
    const { enableSwipe } = this.state

    return (
      <View style={styles.container} onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        this.width = width
        this.setState({ width })
      }}>
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiper => { this.swiper = swiper }}
            backgroundColor='transparent'
            onSwiped={this.onSwiped}
            onSwipedLeft={this.onSwipe}
            onSwipedRight={this.onSwipe}
            cards={this.state.cards}
            cardIndex={this.state.cardIndex}
            marginTop={0}
            cardVerticalMargin={0}
            renderCard={this.renderCard}
            onSwipedAll={this.onSwipedAllCards}
            verticalThreshold={9999999999}
            verticalSwipe={false}
            horizontalSwipe={enableSwipe}
            marginBottom={marginBottom || 0}
            cardHeight2={'100%'}
            cardWidth2={'100%'}
            infinite
            cardHorizontalMargin={0}
            zoomFriction={5}
            secondCardZoom={0.95}
            swipeAnimationDuration={150}
            {...etc}
          />
          <View style={styles.stack}>
            <Image
              resizeMode='stretch'
              style={ IS_IOS ? styles.stackDecorator : styles.stackDecoratorAndroid }
              source={Images.stack} />
          </View>
        </View>
      </View>
    )
  }
}
