import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as Ani from 'react-native-animatable'

import { SwipePlacesScreen, MessagesScreen, SwipePeopleScreen, ActivityScreen } from 'Screens'
import { BottomTabs, Drawer } from 'Components'

import { Images, calcRem, IS_IOS } from 'Themes'
import { isX } from 'Tools'
import Locales from 'Locales'

import styles from './MainScreen.style'

export default class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: props.tab || 2
    }
    this.tabs = [
      <ActivityScreen />,
      <SwipePeopleScreen />,
      <SwipePlacesScreen />,
      <MessagesScreen />
    ]
  }

  changeTab = (tab) => {
    if (tab === 1) {
      Actions.activityScreen()
    } else if (tab === 4) {
      Actions.messagesScreen()
    } else this.setState({ tab })
  }

  renderTab = (component, index) => {
    const { tab } = this.state
    return index + 1 === tab
    ? <View styles={styles.tab} key={index}>
      {component}
    </View> : null
  }

  render () {
    const { tab } = this.state
    return (
      <View style={styles.tabLayout}>
        <Drawer />
        <View style={styles.content}>
          {this.tabs.map(this.renderTab)}
        </View>
        <BottomTabs
          style={styles.buttons}
          active={tab}
          onPress={this.changeTab} />
      </View>
    )
  }
}
