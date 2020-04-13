import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'

import { Header, UserCard, ActionSheet, UserActions } from 'Components'
import UserMore from 'Components/CardSwiper/Components/UserMore'
import { Images, height, rem, Colors } from 'Themes'
import AnimatedLoader from 'Components/AnimatedLoader/AnimatedLoader'

import styles from './UserCardScreen.style'

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 3
const options = [
  'Cancel',
  <Text style={{ color: Colors.purplePink, fontSize: 18 }}>Report</Text>,
  <Text style={{ color: Colors.purplePink, fontSize: 18 }}>Block</Text>
]

export default class UserCardScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: this.props.closed ? false : true,
      more: false,
      offsetY: 0
    }
    this.handlePress = this.handlePress.bind(this)
    this.showActionSheet = this.showActionSheet.bind(this)
    this.showUserActions = this.showUserActions.bind(this)
    this.showAction = this.showAction.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  showActionSheet () {
    this.ActionSheet.show()
  }

  handlePress (i) {
    if (i != CANCEL_INDEX) {
      this.showUserActions(i)
    }
  }

  showUserActions (i) {
    const type = this._getActionType(i)
    this.UserActions.show(type)
  }

  handleConfirm = (type, id) => {
    const { userId } = this.props
    if (type === 'report') {
      const { report } = this.props
      report(userId, 'report')
      this.close()
    } else if (type === 'block') {
      const { block } = this.props
      block(userId)
      this.close()
    }
  }

  _getActionType (i) {
    let type = 'report'
    if (i == 1) {
      type = 'report'
    } else if (i == 2) {
      type = 'block'
    }
    return type
  }

  showAction () {
    this.showActionSheet()
  }

  onAboutScroll = (e) => {
    const { x, y } = e.nativeEvent.contentOffset
    this.setState({ offsetY: y})
  }

  prepareData () {
    const { person, user, userId } = this.props
    const { item } = person
    const { userInfo } = user
    let isPlus = false
    if (userInfo !== null) {
      const { godUser, plusMember } = userInfo
      isPlus = (godUser || plusMember === '1')
    }

    if (item) {
      return {
        id: userId,
        photos: item.photos && item.photos.length > 0 ? this.sortPhotos(item.photos).map(e => e.path) : [],
        name: item.name,
        milesAway: parseFloat(item.distance).toFixed(1),
        height: item.height,
        education: item.educations.length > 0 ? item.educations[0] : null,
        religion: item.religion,
        bodyType: item.bodyTypes.length > 0 ? item.bodyTypes[0] : null,
        age: item.age,
        messagePlus: isPlus
      }
    }
    return null
  }

  sortPhotos = (photos) => {
    // const filterPhotos = photos.filter(item => item.source != 'instagram')
    let newPhotos = Object.assign([], photos)
    newPhotos.sort((a, b) => {
      return a.num < b.num
    })
    return newPhotos.slice(0, 5)
  }

  renderContent = () => {
    const { person, user, blockedUser } = this.props
    const { offsetY } = this.state

    const userData = this.prepareData()
    return (
        <View style={{ flex: 1 }}>
          <ScrollView
            ref='scroll'
            onScroll={this.onAboutScroll}
            scrollEventThrottle={0.1}
            contentContainerStyle={{ minHeight: height - rem * 4, paddingBottom: rem * 0.8 }}>
            <View style={{ flex: 1 }}>
              <View style={{height: height * 2 / 3, zIndex: 2}}>
                {userData
                  ? <UserCard offsetY={offsetY} {...userData} id={this.props.userId} ownerID={user.id} blockedUser={blockedUser} />
                  : <AnimatedLoader fullHeight />
                }
              </View>
              {person.item
                ? <UserMore
                  showAction={this.showAction}
                  upArrowHidden
                  user={person.item} /> : null}
            </View>
          </ScrollView>
        </View>
    )
  }

  render () {
    const { person, userName } = this.props
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Header title={ userName } noBorder />
          {this.renderContent()}
        </View>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          tintColor={Colors.black75}
          onPress={this.handlePress} />
        <UserActions
          ref={o => this.UserActions = o}
          user={person.item}
          onConfirm={this.handleConfirm} />
      </View>
    )
  }
}
