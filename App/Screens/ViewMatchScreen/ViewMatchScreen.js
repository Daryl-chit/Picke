import React, { Component } from 'react'
import {
  View,
  Text,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native'

import * as Ani from 'react-native-animatable'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

import Spinner from 'react-native-spinkit'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import { Images, calcRem, Colors, IS_IOS } from 'Themes'

import {
  Header,
  FastImage as Image,
  AnimatedLoader,
  UserCardModal,
  MessageInput,
  DialogTitle
} from 'Components'

import {
  EaseOpacity
} from 'Animations/LayoutAnimation'

import styles from './ViewMatchScreen.style'

export default class ViewMatchScreen extends Component {
  state = {
    keyboard: false
  }

  componentDidMount () {
    const { getPerson, userId, matchId, markAsViewed, messagesHistoryRequest } = this.props
    markAsViewed(matchId)
    getPerson(userId)
    messagesHistoryRequest(matchId)
  }

  renderTitle = (user) => {
    return (
      <Ani.View
        animation='fadeInDown'
        easing='ease-in-out-sine'
        duration={700}
        delay={200}>
        <TouchableOpacity onPress={this.openUserCardScreen}>
          <DialogTitle user={user} />
        </TouchableOpacity>
      </Ani.View>
    )
  }

  toggleKeyboard = (keyboard) => {
    LayoutAnimation.configureNext(EaseOpacity)
    this.setState({ keyboard })
  }

  renderName () {
    const { person } = this.props
    const { item } = person
    return (
      <Ani.Text
        animation='zoomIn'
        easing='ease-in-out-quart'
        duration={777}
        style={styles.userNameText}>
        {item.name}, <Text style={styles.userAge}>{item.age}</Text>
      </Ani.Text>
    )
  }

  renderSpinner () {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }}>
        <Spinner
          style={{
            width: calcRem(8),
            height: calcRem(8),
            alignSelf: 'center'
          }}
          size={calcRem(8)}
          type={ IS_IOS ? 'Arc' : 'Circle' }
          color={Colors.purplePink}
        />
      </View>
    )
  }

  openUserCardScreen = () => {
    const { person, userId } = this.props
    if (person) {
      const { item } = person
      Actions.userCardScreen({ userId: userId, userName: item.name })
    }
  }

  renderHeaderRight = () => {
    return (
      <TouchableOpacity
        style={styles.userButton}
        onPress={this.openUserCardScreen}>
        <Image
          source={Images.userLine}
          style={styles.userLineIcon} />
      </TouchableOpacity>
    )
  }

  render () {
    const { person, userId, matchId } = this.props
    const { keyboard } = this.state
    const { item } = person

    return (
      <View style={styles.screen}>
        {item && item.name
        ? <View style={{ flex: 1 }}>
          <Header
            noBorder
            style={styles.header}
            title={false}
            right={this.renderHeaderRight()}
            afterTitle={this.renderTitle(item)}
            onBack={() => {
              Actions.reset('messagesScreen')
            }}
          />
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <Ani.View
                animation='flipInX'
                easing='ease-in-out-quad'
                duration={1100}
                delay={300}
                style={styles.date}>
                <Image
                  source={Images.calendar}
                  style={styles.dateIcon} />
                <Text style={styles.dateText}>
                  {moment().format('MMM DD, YYYY').toUpperCase()}
                </Text>
              </Ani.View>
              {keyboard ? this.renderName() : null}
              {!keyboard
              ? <Ani.Text
                animation='fadeInLeft'
                easing='ease-in-out-quint'
                duration={900}
                delay={100}
                style={styles.headerText}>
                {'New match'.toUpperCase()}
              </Ani.Text> : null}
            </View>
            <Ani.View
              animation='fadeInRight'
              easing='ease-in-out-quint'
              duration={900}
              delay={100}>
              <TouchableOpacity onPress={this.openUserCardScreen} style={styles.photoButton}>
                <Image
                  source={{ uri: item && item.photos && item.photos[0] ? item.photos[0].path : '' }}
                  style={[styles.userPhoto,
                    keyboard ? {
                      height: calcRem(8),
                      width: calcRem(6.5)
                    } : {}]}
                  resizeMode='cover' />
              </TouchableOpacity>
            </Ani.View>
            {!keyboard ? this.renderName() : null}
            {!keyboard
            ? <Ani.Text
              animation='flipInX'
              easing='ease-in-out-quad'
              duration={1500}
              delay={500}
              style={styles.adviceText}>
              {'Give them a compliment and watch what happens.'}
            </Ani.Text> : null}
          </View>
          <Ani.View
            animation='fadeInUp'
            easing='ease-in-out-quad'
            duration={900}
            delay={300}>
            <MessageInput fromMatch matchId={matchId} userId={userId} />
          </Ani.View>
        </View> : this.renderSpinner()}
        <KeyboardSpacer onToggle={this.toggleKeyboard} />
      </View>
    )
  }
}

// <AnimatedLoader heightRatio={0.85} />
