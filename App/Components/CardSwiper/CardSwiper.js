import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'

import { equals } from 'ramda'
import * as Ani from 'react-native-animatable'
import { Actions } from 'react-native-router-flux'

import { rem, Images, Colors, calcHeight, IS_IOS } from 'Themes'

import { removeDuplicates } from 'Tools'

import {
  UserCard,
  AnimatedLoader,
  FastImage,
  SwiperAnimated as Swiper,
  ActionSheet,
  UserActions,
  Image,
  StatusPlaceholder,
  SubscriptionModal
} from 'Components'

import UserMore from './Components/UserMore'

import styles from './CardSwiper.style'

const iconStyle = {
  position: 'absolute',
  top: -(7 * rem),
  width: 9 * rem
}

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 3

const options = [
  'Cancel',
  <Text style={{color: Colors.purplePink, fontSize: 18}}>Report</Text>,
  <Text style={{color: Colors.purplePink, fontSize: 18}}>Block</Text>
]

const LikeIcon = () => <Image style={[iconStyle, { left: rem }]} source={Images.like} />
const DislikeIcon = () => <Image style={[iconStyle, { right: rem }]} source={Images.dislike} />

const lastPeoplesIds = (cards, nextCardIndex) => cards.slice(nextCardIndex, cards.length).map(item => item.id)

const NUM_DIFF_COUNT = 6

export default class CardSwiper extends Component {
  constructor (props) {
    super(props)

    this.offsetY = 0

    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0,
      width: 0,
      expanded: null,
      loading: false,
      cards: this.prepareData(props.people.list),
      userMoreOpen: false,
      scrollOffset: 0,
      subscriptionModalPage: 4
    }
    this.handlePress = this.handlePress.bind(this)
    this.showActionSheet = this.showActionSheet.bind(this)
    this.showUserActions = this.showUserActions.bind(this)
    this.showAction = this.showAction.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.swipingBack = false
  }

  componentWillReceiveProps (nextProps) {
    const isNewList = !equals(nextProps.people.list, this.props.people.list)
    const isNewExcludeUsers = !equals(nextProps.settings.excludeUsers, this.props.settings.excludeUsers)
    const isNewSettings = !equals(nextProps.settings, this.props.settings)
    // const { blockData } = nextProps
    let cards = Object.assign([], this.state.cards)
    let swipedAllCards = this.state.swipedAllCards
    let loading = this.state.loading
    let cardIndex = this.state.cardIndex
    if (isNewList) {
      const newCards = this.prepareData(nextProps.people.list)
      const ids = cards.map(e => e.id)
      newCards.map(e => {
        if (!ids.includes(e.id)) {
          cards.push(e)
        }
      })
      loading = false
      swipedAllCards = false
    }
    if (isNewExcludeUsers) {
      const { excludeUsers } = nextProps.settings
      let newCards = cards
      newCards.map((card, index) => {
        if (!!excludeUsers && excludeUsers.indexOf(card.id) > -1) {
          cards.splice(index, 1)
        }
      })
    }
    if (isNewSettings) {
      cards = []
      cardIndex = 0
    }
    this.setState({ cards, cardIndex, loading, swipedAllCards })
  }

  openModal = () => {
    this.refs.modal.open()
  }

  showActionSheet () {
    this.ActionSheet.show()
  }

  handlePress (i) {
    if (i !== CANCEL_INDEX) {
      this.showUserActions(i)
    }
  }

  showUserActions (i) {
    const type = this._getActionType(i)
    this.UserActions.show(type)
  }

  onLayoutContainer = e => {
    const { width } = e.nativeEvent.layout
    this.width = width
    this.setState({ width })
  }

  handleConfirm = (type, userId) => {
    if (type === 'report') {
      const { report } = this.props
      report(userId, 'report')
    } else if (type === 'block') {
      const { block } = this.props
      block(userId)
    }
    const { cardIndex } = this.state
    this.expandAbout()
    setTimeout(() => {
      this.onLeft(cardIndex)
    }, 400)
  }

  _getActionType (i) {
    let type = 'report'
    if (i === 1) {
      type = 'report'
    } else if (i === 2) {
      type = 'block'
    }
    return type
  }

  showAction () {
    this.showActionSheet()
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
            marginLeft: -30,
            zIndex: 12
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
            marginLeft: 30,
            zIndex: 12
          }
        }
      }
    }
  }

  renderCard = (card, index) => {
    const { cards, cardIndex, userMoreOpen, scrollOffset } = this.state
    const { user } = this.props
    const { userInfo } = user
    let isPlus = false
    if (userInfo !== null) {
      const { godUser, plusMember } = userInfo
      isPlus = (godUser || plusMember === '1')
    }
    if (card && card.id) {
      const firstCard = cards[cardIndex]
      const isFirst = (firstCard && (firstCard.id === card.id))
      // const isExpanded = (card.id === expanded)
      const userCard = (
        <UserCard
          {...card}
          messagePlus={isPlus}
          userMoreOpen={userMoreOpen}
          showMoreIcon
          offsetY={scrollOffset}
          onBottomPress={id => this.expandAbout(id, card.user)}
        />
      )
      if (isFirst && this.swipingBack) {
        this.swipingBack = false
        return (
          <Ani.View
            useNativeDriver
            style={styles.card}
            easing='ease-in-out-quint'
            key={card.id}
            duration={480}
            animation='slideInLeft'>
            {userCard}
          </Ani.View>
        )
      } else {
        return (
          <View style={styles.card} key={card.id}>
            {userCard}
          </View>
        )
      }
    } else {
      return <View />
    }
  }

  expandAbout = (id, user) => {
    const { expanded, userMoreOpen } = this.state
    if (expanded === null && !userMoreOpen) {
      const { instagram_user, about, instagramPhotos } = user
      let y = rem * 5
      const instagram = (instagram_user && instagramPhotos && instagramPhotos.length > 0)
      if (instagram) y += rem * 23.7
      if (about) y += about.length * rem * 0.035
      this.setState({
        expanded: id,
        userMoreOpen: true,
        scrollOffset: y })
      this.refs.scroll.scrollTo({ y, animated: true })
    } else {
      this.refs.scroll.scrollTo({ y: 0, animated: true })
      this.refs.more.hide()
      setTimeout(() => this.setState({
        expanded: null,
        userMoreOpen: false,
        scrollOffset: 0
      }), 300)
    }
  }

  hideAbout = (props) => {
    this.refs.more.hide()
    setTimeout(() => this.setState({ expanded: null, ...props }), 300)
  }

  onAboutScroll = (e) => {
    const { y } = e.nativeEvent.contentOffset
    const { userMoreOpen } = this.state
    if (y > this.offsetY && !userMoreOpen && y > 100) {
      this.offsetY = y
      this.setState({ userMoreOpen: true, scrollOffset: this.offsetY })
    } else if (y < this.offsetY && userMoreOpen && y < 20) {
      this.offsetY = y
      setTimeout(() => this.setState({ userMoreOpen: false, expanded: null, scrollOffset: this.offsetY }), 300)
    } else {
      this.offsetY = y
      this.setState({ scrollOffset: this.offsetY })
    }

  }

  swipeBack = () => {
    const { cardIndex } = this.state
    if (this.state.isSwipingBack) {
      const { user } = this.props
      const { userInfo } = user
      const { godUser, plusMember } = userInfo
      const isPlus = (godUser || plusMember === '1')
      if (isPlus) {
        if (cardIndex > 0) {
          const prevCardIndex = cardIndex - 1
          this.swipingBack = true
          this.refs.swiper.jumpToCardIndex(prevCardIndex)
          this.setState({ cardIndex: prevCardIndex, expanded: null, isSwipingBack: false })
        }
      } else {
        this.refs.modal.open(4)
      }
    }
  }

  jumpTo = () => {

  }

  resetCards = () => {
    this.setState({ cards: [], cardIndex: 0, isSwipingBack: false, loading: true })
  }

  setNextCardIndex = (cardIndex, isSwipingBack) => {
    const { getPeople, people } = this.props
    const { cards, loading } = this.state
    const lastCardIndex = cards.length - NUM_DIFF_COUNT
    const nextCardIndex = cardIndex + 1
    if (nextCardIndex === lastCardIndex && !people.fetching && !loading) {
      this.setState({ expanded: null, loading: true, cardIndex: nextCardIndex, isSwipingBack: isSwipingBack })
      getPeople({ lastIds: lastPeoplesIds(cards, nextCardIndex) })
    } else if (people.list.length === 1) {
      this.resetCards()
    } else {
      this.setState({ cardIndex: nextCardIndex, isSwipingBack: isSwipingBack })
    }
  }

  onLeft = (index) => {
    const { dislike } = this.props
    const { cards } = this.state
    if (cards && cards.length > index) {
      const userId = cards[index].id
      this.setNextCardIndex(index, true)
      dislike(userId)
    }
  }

  onRight = (index) => {
    const { like } = this.props
    const { cards } = this.state

    if (cards && cards.length > index) {
      const userId = cards[index].id
      this.setNextCardIndex(index, false)
      like(userId)
    }
  }

  prepareData (list) {
    const peoples = []
    if (list && list.length > 0) {
      list.map(item => {
        const nonImmutablePhotos = [].concat(item.photos)
        peoples.push({
          id: item.id,
          photos: nonImmutablePhotos.sort((a, b) => b.num - a.num).map(e => e.path),
          name: item.name,
          milesAway: parseFloat(item.distance).toFixed(1),
          height: item.height,
          zodiac: item.zodiac,
          education: item.education.length > 0 ? item.education[0] : null,
          religion: item.religion,
          bodyType: item.bodyTypes.length > 0 ? item.bodyTypes[0] : null,
          age: item.age,
          user: item
        })
      })
    }
    return peoples
  }

  onSwipedAll = () => {
    this.setState({ swipedAllCards: true })
  }

  renderSwipeBackButton () {
    const {isSwipingBack} = this.state
    if (isSwipingBack) {
      return (
        <TouchableOpacity
          onPress={this.swipeBack}
          style={styles.swipeBackButton}>
          <Ani.View
            useNativeDriver
            delay={200}
            duration={650}
            easing='ease'
            animation='slideInLeft'>
            <FastImage
              source={Images.revert}
              style={styles.swipeBackIcon} />
          </Ani.View>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }

  refresh = () => {
    const { getPeople } = this.props
    getPeople()
    this.resetCards()
  }

  renderStatus () {
    const { people } = this.props
    const { fetching, error, list } = people
    if (fetching) {
      return <AnimatedLoader heightRatio={0.88} />
    } else if (!fetching && !error) {
      return <StatusPlaceholder
        buttonText='Refresh'
        style={{
          // marginTop: calcHeight(0.5)
        }}
        onButtonPress={this.refresh}
        title='There’s no one new around you.'
      />
    } else if (error) {
      return <StatusPlaceholder
        style={{
          // marginTop: calcHeight(0.5)
        }}
        buttonText='Refresh'
        onButtonPress={this.refresh}
        title='Error fetching users. Try again!' />
    }
  }

  onClickLikeButton = () => {
    const { user } = this.props
    let isPlus = false
    if (user.userInfo !== null) {
      const { godUser, plusMember } = user.userInfo
      isPlus = (godUser || plusMember === '1')
    }
    isPlus ? Actions.likesScreen() : this.refs.modal.open(2)
  }

  renderLikesButton = () => {
    const { totalWhoLiked } = this.props
    if (totalWhoLiked !== null && totalWhoLiked > 0) {
      return (
        <TouchableOpacity
          onPress={this.onClickLikeButton}
          style={styles.likesButton}>
          <View style={{ flex: 1 }}>
            <View style={styles.likesTotal}>
              <Text style={styles.totalText}>{totalWhoLiked}</Text>
            </View>
            <FastImage
              source={Images.likes}
              style={styles.likesIcon} />
          </View>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }

  renderUserMore = () => {
    const { userMoreOpen, cards, cardIndex } = this.state
    if (userMoreOpen && cards && cards[cardIndex] && cards[cardIndex].user) {
      const user = cards[cardIndex].user
      return (
        <UserMore
          ref='more'
          showAction={this.showAction}
          onBottomPress={this.expandAbout}
          user={user}
        />
      )
    } else {
      return null
    }
  }

  renderLoader () {
    return <AnimatedLoader heightRatio={0.88} />
  }

  renderSwiperContainerRoot () {
    const { cards, userMoreOpen, swipedAllCards, cardIndex, loading } = this.state
    const { list, fetching, error } = this.props.people
    const last = cards.length - cardIndex - NUM_DIFF_COUNT
    const empty = this.props.people.list.length === 0 || error
    if (cards.length > 0) {
      return (
        <View style={styles.swiperContainerRoot}>
          {this.renderLikesButton()}
          {this.renderSwipeBackButton()}
          <ScrollView
            ref='scroll'
            onScroll={this.onAboutScroll}
            scrollEventThrottle={0.1}
            scrollEnabled={userMoreOpen && !empty}
            style={styles.swiperScrollView}
            contentContainerStyle={styles.swiperScrollViewContainer}>
            <View style={styles.swiperContainer}>
              <Swiper
                ref='swiper'
                horizontalSwipe={!userMoreOpen && !empty}
                verticalSwipe
                animateOverlayLabelsOpacity
                backgroundColor='transparent'
                zoomFriction={5}
                secondCardZoom={1}
                verticalThreshold={9999999999}
                swipeAnimationDuration={250}
                onSwipedLeft={this.onLeft}
                onSwipedRight={this.onRight}
                onSwipedAll={this.onSwipedAll}
                cards={cards}
                marginBottom={0}
                cardVerticalMargin={0}
                cardHorizontalMargin={0}
                cardHeight2={'100%'}
                cardWidth2={'100%'}
                cardIndex={cardIndex}
                renderCard={this.renderCard}
                overlayLabels={this.overlayLabels()}
                animateOverlayLabelsOpacityz
              />
              <View style={styles.stack}>
                {this.props.people.list.length === 0 || last < 1
                  ? <View style={styles.statusContainer}>{this.renderStatus()}</View>
                  : swipedAllCards && fetching
                    ? this.renderLoader()
                    : null}
                {IS_IOS
                  ? <Image resizeMode='stretch' style={styles.stackDecorator} source={Images.stack} />
                  : !userMoreOpen
                    ? <Image resizeMode='stretch' style={styles.stackDecoratorAndroid} source={Images.stack} />
                    : null}

              </View>
            </View>
            {this.renderUserMore()}
          </ScrollView>
        </View>
      )
    } else {
      return this.renderStatus()
    }
  }

  render () {
    const { cardIndex, cards } = this.state
    const card = cards[cardIndex]
    return (
      <View style={styles.container} onLayout={this.onLayoutContainer}>
        {this.renderSwiperContainerRoot()}
        <SubscriptionModal subscriptionLog={this.props.subscriptionLog} subscriptionRequest={this.props.subscriptionRequest} ref='modal' />
        <ActionSheet
          ref={o => { this.ActionSheet = o }}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          tintColor={Colors.black75}
          onPress={this.handlePress} />
        {card
          ? <UserActions
            ref={o => { this.UserActions = o }}
            user={card.user}
            onConfirm={this.handleConfirm} />
          : null }
      </View>
    )
  }
}
