import React, { Component } from 'react'
import {
  View,
  Text,
  LayoutAnimation
} from 'react-native'

import * as Ani from 'react-native-animatable'
import { Actions } from 'react-native-router-flux'
import { AdMobBanner } from 'react-native-admob'
import {
  AnimatedLoader,
  Header,
  FastImage as Image,
  MatchedUsers,
  Dialogs,
  StatusPlaceholder
} from 'Components'

import { Images, IS_IOS } from 'Themes'
import { ExpandSpring } from 'Animations/LayoutAnimation'
import { Search } from './Components'

import { ADMOB_UNIT_ID } from 'Config/Constants'

import styles from './MessagesScreen.style'

export default class MessagesScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: false,
      searchString: ''
    }
  }

  renderMatchedTotal () {
    const { totals } = this.props
    if (totals.new_dialogs) {
      const count = parseInt(totals.new_dialogs)
      return count > 0 ? this.renderTitle('+' + totals.new_dialogs) : null
    } else {
      return null
    }
  }

  renderTotalMessages () {
    const { dialogs, dialogsList } = this.props
    const isDialogs = (dialogsList.length > 0)
    const totalMessages = dialogs.totals && dialogs.totals.unread_messages ? parseInt(dialogs.totals.unread_messages) : false
    return totalMessages && totalMessages > 0 && isDialogs ? this.renderTitle(
      '+' + totalMessages
    ) : null
  }

  renderTitle (text) {
    return (
      <View style={styles.headerTotal}>
        <Text style={styles.headerTotalText}>{text}</Text>
      </View>
    )
  }

  renderSearchIcon () {
    return (
      <Image
        source={Images.search}
        style={styles.searchIcon} />
    )
  }

  toggleSearch = () => {
    const { search, searchString } = this.state
    LayoutAnimation.configureNext(ExpandSpring)
    this.setState({
      search: !search,
      searchString: !search ? searchString : ''
    })
  }

  back = () => {
    const { user, cleanRequest } = this.props
    if (user.is_hidden) {
      Actions.replace('mainScreen')
    } else {
      Actions.reset('mainScreen')
      cleanRequest()
    }
  }

  onSearchChange = (searchString) => {
    this.setState({ searchString })
  }

  renderEmpty = () => {
    return (
      <StatusPlaceholder
        buttonText='Refresh'
        onButtonPress={() => this.props.getDialogs(0)}
        title='No dialogs yet' />
    )
  }

  refresh = () => {
    const { dialogsRequest } = this.props
    dialogsRequest()
  }
  clearSearch = () => {
    this.setState({ searchString: '', search: false })
  }

  render () {
    const { matchedUsersList, user } = this.props
    const { search, searchString } = this.state
    const { userInfo } = user
    const { godUser, plusMember } = userInfo
    const isPlus = (godUser || plusMember === '1')

    return (
      <View style={styles.screen}>
        <Header
          noBorder
          style={styles.header}
          title={'New matches'}
          rightIcon={this.renderSearchIcon()}
          onRight={this.toggleSearch}
          onBack={this.back}
          afterTitle={this.renderMatchedTotal()} />
        {search
          ? <Ani.View
            useNativeDriver
            duration={700}
            easing='ease-in-out-sine'
            animation='flipInX'>
            <Search
              total={matchedUsersList && matchedUsersList.length}
              onChange={this.onSearchChange} />
          </Ani.View> : null}
        <View style={styles.wrapper}>
          <MatchedUsers searchString={searchString} />
          <View style={styles.screenContent}>
            <Header
              noBorder
              left={<View />}
              style={styles.subheader}
              title={'Messages'}
              afterTitle={this.renderTotalMessages()} />
            <Dialogs
              onItemPress={this.clearSearch}
              searchString={searchString}
              refresh={this.refresh}
              />

          </View>
        </View>

        {!isPlus
        ? <AdMobBanner
          style={styles.banner}
          adSize='smartBanner'
          adUnitID={ADMOB_UNIT_ID}
          testDevices={[AdMobBanner.simulatorId]} />
        : null }
      </View>
    )
  }
}
