import React, { Component } from 'react'
import { View, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'

import EStyleSheet from 'react-native-extended-stylesheet'

import { PlacesScreen, ChatScreen, SwipePeopleScreen, ActivityScreen } from 'Screens'
import { BottomTabs } from 'Components'

const AnimationConfig = {
  duration: 649,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.75
  },
  update: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.6
  },
  delete: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.8
  }
}

export default class TabsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: props.tab || 1
    }
    this.tabs = [
      <ActivityScreen />,
      <PlacesScreen />,
      <SwipePeopleScreen />,
      <ChatScreen />
    ]
  }
  changeTab = (tab) => {
    // LayoutAnimation.configureNext(AnimationConfig)
    this.setState({ tab })
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

const styles = EStyleSheet.create({
  tabLayout: {
    flex: 1
  },
  content: {
    height: '92%'
  },
  buttons: {
    height: '8%'
  }
})
