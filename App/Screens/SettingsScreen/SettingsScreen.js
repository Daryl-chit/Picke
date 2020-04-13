import React, { Component } from 'react'
import {
  View,
  LayoutAnimation,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import { ExpandSpring } from 'Animations/LayoutAnimation'

import { Settings, SettingsApp, LoaderOverlay, SubscriptionModal, ScalableImage as Image } from 'Components'
import { Colors, Images, calcWidth } from 'Themes'

import Expander from './Components/Expander'
import UserHeader from './Components/UserHeader'
import Footer from './Components/Footer'

import styles from './SettingsScreen.style'

export default class SettingsScreen extends Component {
  state = {
    active: null
  }

  openModal = () => {
    this.refs.modal.open()
  }

  setActive (id) {
    const { active } = this.state
    LayoutAnimation.configureNext(ExpandSpring)
    this.setState({ active: active === id ? null : id })
  }

  showHideScreen () {
    const { user, showUser } = this.props
    const { is_hidden } = user
    if (is_hidden) {
      showUser()
    } else {
      Actions.hideAccountScreen({ user: user })
    }

  }

  showDeleteScreen = () => {
    const { user } = this.props
    Actions.deleteAccountScreen({ user: user })
  }

  renderLoader = () => {
    const { showData } = this.props
    if (showData) {
      const { loading } = showData
      return (
        loading ? <LoaderOverlay /> : null
      )
    } else {
      return null
    }
  }

  messagesScreen = () => {
    Actions.messagesScreen()
  }

  render () {
    const { active } = this.state
    const { user, dialogs, favouritesTotal, logout } = this.props
    const { userInfo } = user
    const { godUser, plusMember } = userInfo
    const isPlus = (godUser || plusMember === '1')

    const totalMessages = dialogs.totals && dialogs.totals.unread_messages
    ? `+${dialogs.totals.unread_messages}` : null

    const totalSavedPlaces = favouritesTotal > 0 ? `+${favouritesTotal}` : ''

    return (
      <View style={[styles.screen, { backgroundColor: Colors.backgroundColor }]}>
        {this.renderLoader()}
        <ScrollView>
          {user && user.name ? <UserHeader openModal={this.openModal} user={user} /> : null}
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              {!isPlus ?
              <TouchableOpacity
                style={styles.banner}
                onPress={this.openModal}>
                <Image
                  source={Images.banner}
                  width={calcWidth(0.93)}
                  />
              </TouchableOpacity>
              : null}
              <Expander
                rightText={totalMessages}
                title={'Messages'}
                onPress={this.messagesScreen}
                active={active === 1} />
              <Expander
                rightText={totalSavedPlaces}
                title={'Saved Places'}
                onPress={() => Actions.savedPlacesScreen()}
                active={active === 2}>
                <Settings />
              </Expander>
              <Expander
                title={'Discovery Preferences'}
                onPress={() => this.setActive(3)}
                active={active === 3}>
                <Settings />
              </Expander>
              <Expander
                title={'App Settings'}
                onPress={() => this.setActive(4)}
                active={active === 4}>
                <SettingsApp
                  onToggle={() => this.showHideScreen()}/>
              </Expander>
            </View>
            <Footer
              logout={logout}
              deleteAccount={this.showDeleteScreen} />
          </View>
        </ScrollView>
        <SubscriptionModal subscriptionLog={this.props.subscriptionLog} subscriptionRequest={this.props.subscriptionRequest} startIndex={0} ref='modal' />
      </View>
    )
  }
}
