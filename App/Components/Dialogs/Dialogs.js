import React, { Component } from 'react'
import {
  View,
  AppState
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import { rem } from 'Themes'
import DialogItem from './Components/DialogItem'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import { AnimatedLoader, StatusPlaceholder } from 'Components'

const ITEM_HEIGHT = 5 * rem + (0.6 * rem)

export default class Dialogs extends Component {
  constructor (props) {
    super(props)
    const { list } = this.props
    this.step = 10
    this.state = {
      list: list || [],
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
      this.setState({ appState: nextAppState })
      this.props.getDialogs(0)
    } else {
      this.setState({ appState: nextAppState })
    }
  }

  componentWillReceiveProps (next) {
    const { searchString } = this.props
    if (searchString !== next.searchString) {
      this.setState({ searchString: next.searchString })
    }
  }

  onItemPress = (item) => {
    const { onItemPress } = this.props
    if (onItemPress) onItemPress()
    Actions.chatScreen({
      userId: item.user.id,
      matchId: item.match_id
    })
    this.props.setCurrent({
      userId: item.user.id,
      matchId: item.match_id
    })
  }

  loadMore = () => {
    const { list, getDialogs, loaded, loading } = this.props
    if (list && list.length > 0 && !loaded && !loading) {
      getDialogs()
    }
  }

  onEndReached = () => {
    this.loadMore()
  }

  renderDialog = (data) => {
    const { userId } = this.props
    return (
      <DialogItem
        image={!!data.item.last_message.message_image_path}
        onItemPress={this.onItemPress}
        key={data.index}
        data={data}
        userId={userId} />
    )
  }
  renderEmpty = () => {
    return (
      <StatusPlaceholder
        buttonText='Refresh'
        onButtonPress={this.props.refresh}
        title='No dialogs yet' />
    )
  }

  render () {
    const { list, fetching } = this.props
    const { searchString } = this.state
    let data = list
    if (searchString) {
      data = data.filter(f =>
        f.user.name.toLowerCase().includes(searchString.toLowerCase()) ||
        f.last_message.message.toLowerCase().includes(searchString.toLowerCase()
      ))
    }
    const firstTimeFetching = (list && list.length === 0)
    const isFetching = fetching
    const isDialogs = (!isFetching && list && list.length > 0)

    return (
      <View style={{ flex: 1 }}>
        {isFetching && list.length === 0 ? <AnimatedLoader heightRatio={0.75} /> : null}
        {firstTimeFetching && !fetching ? this.renderEmpty() : null}
        <OptimizedFlatList
          ref='slider'
          data={data}
          contentContainerStyle={{ alignSelf: 'stretch' }}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={1200}
          keyExtractor={(item, index) => item.match_id}
          getItemLayout={(data, index) => (
            { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
          )}
          removeClippedSubviews
          disableVirtualization
          extraData={data}
          renderItem={this.renderDialog} />
      </View>
    )
  }
}
