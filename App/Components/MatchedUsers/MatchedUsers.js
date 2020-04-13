import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  AppState
} from 'react-native'

import Spinner from 'react-native-spinkit'
import { Actions } from 'react-native-router-flux'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

import { Colors, calcRem, IS_IOS } from 'Themes'

import {
  FastImage as Image
} from 'Components'

import s from './MatchedUsers.style'

export default class MatchedUsers extends Component {
  constructor (props) {
    super(props)
    this.step = 30
    this.state = {
      list: [],
      refreshing: false,
      searchString: '',
      appState: AppState.currentState
    }
  }

  componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnMount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.setState({ appState: nextAppState})
      this.props.getMatchedUsers(0)
    } else {
      this.setState({ appState: nextAppState })
    }
  }

  componentWillMount () {
    this.props.getMatchedUsers(0)
  }

  componentDidUpdate () {
    LayoutAnimation.spring()
  }

  componentWillReceiveProps (next) {
    const { searchString } = this.props
    if (searchString !== next.searchString) {
      this.setState({ searchString: next.searchString })
    }
  }

  onItemPress (item) {
    Actions.viewMatchScreen({ userId: item.user.id, matchId: item.match_id })
  }

  loadMore = () => {
    const { list, getMatchedUsers, loading, loaded } = this.props
    if (list && list.length > 0 && !loaded && !loading) {
      getMatchedUsers()
    }
  }

  onEndReached = () => {
    this.loadMore()
  }

  renderUser = (data) => {
    const { item, index } = data
    const key = index
    const { user, new_match } = item
    const { name } = user

    const avatar = user && user.avatar && user.avatar.thumbs && user.avatar.thumbs.length > 0 ? user.avatar.thumbs[0] : ''

    const newMatchIndicator = new_match === '1'
    ? <View style={s.indicator} /> : null

    return (
      <TouchableOpacity
        onPress={() => this.onItemPress(item)}
        style={s.userItem}
        key={key}>
        <Image
          source={{ uri: avatar }}
          resizeMode='cover'
          style={s.avatar} />
        <Text style={s.nameText}>{name}</Text>
        {newMatchIndicator}
      </TouchableOpacity>
    )
  }

  renderLoader = () => {
    return (
      <View style={s.loader}>
        <Spinner
          size={calcRem(1.6)}
          type={ IS_IOS ? 'Arc' : 'Circle' }
          color={Colors.purplePink} />
      </View>
    )
  }
  renderEmpty = () => {
    return (
      <View style={s.emptyPlaceholder}>
        <Text style={s.emptyPlaceholderText}>There is no new matches</Text>
      </View>
    )
  }

  render () {
    const { loading, list } = this.props
    const { searchString } = this.state

    let data = list

    if (searchString) {
      data = data.filter(f => f.user.name.toLowerCase().includes(searchString.toLowerCase()))
    }

    return (
      list.length === 0 ? this.renderEmpty()
      : <View style={s.container}>
        <OptimizedFlatList
          ref='slider'
          data={data}
          horizontal
          contentContainerStyle={{ alignSelf: 'stretch' }}
          onEndReached={() => this.onEndReached()}
          keyExtractor={(item, index) => item.match_id + (index * 2)}
          onEndReachedThreshold={0.3}
          removeClippedSubviews
          disableVirtualization
          extraData={list}
          renderItem={this.renderUser} />
      </View>
    )
  }
}
