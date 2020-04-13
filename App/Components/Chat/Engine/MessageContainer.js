import PropTypes from 'prop-types'
import React from 'react'

import { ListView, View, StyleSheet } from 'react-native'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import shallowequal from 'shallowequal'
import InvertibleScrollView from 'react-native-invertible-scroll-view'
import md5 from 'md5'
import LoadEarlier from './LoadEarlier'
import Message from './Message'

export default class MessageContainer extends React.Component {
  constructor (props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderLoadEarlier = this.renderLoadEarlier.bind(this)
    this.renderScrollComponent = this.renderScrollComponent.bind(this)

    this.state = {
      messages: [].concat(this.props.messages).reverse()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.messages !== nextProps.messages) {
      this.setState({
        messages: [].concat(nextProps.messages).reverse()
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!shallowequal(this.props, nextProps)) {
      return true
    }
    if (!shallowequal(this.state, nextState)) {
      return true
    }
    return false
  }

  renderLoadEarlier () {
    if (this.props.loadEarlier === true) {
      const loadEarlierProps = {
        ...this.props
      }
      if (this.props.renderLoadEarlier) {
        return this.props.renderLoadEarlier(loadEarlierProps)
      }
      return <LoadEarlier {...loadEarlierProps} />
    }
    return null
  }

  renderFooter () {
    if (this.props.renderFooter) {
      const footerProps = {
        ...this.props
      }
      return this.props.renderFooter(footerProps)
    }
    return null
  }

  renderRow (message) {
    if (!message._id && message._id !== 0) {
      console.warn('GiftedChat: `_id` is missing for message', JSON.stringify(message))
    }
    if (!message.user) {
      if (!message.system) {
        console.warn('GiftedChat: `user` is missing for message', JSON.stringify(message))
      }
      message.user = {}
    }

    const messageProps = {
      ...this.props,
      key: message._id,
      currentMessage: message,
      previousMessage: message.previousMessage,
      nextMessage: message.nextMessage,
      position: message.user._id === this.props.user._id ? 'right' : 'left'
    }

    if (this.props.renderMessage) {
      return this.props.renderMessage(messageProps)
    }
    return <Message {...messageProps} />
  }

  renderScrollComponent (props) {
    const { invertibleScrollViewProps } = this.props
    return (
      <InvertibleScrollView
        {...props}
        {...invertibleScrollViewProps}
        ref={(component) => (this._invertibleScrollViewRef = component)}
      />
    )
  }

  render () {
    const { inverted } = this.props

    return (
      <View style={styles.container}>
        <OptimizedFlatList
          ref={r => this.flatList = r}
          automaticallyAdjustContentInsets={false}
          inverted={inverted}
          data={this.state.messages}
          keyExtractor={(item, index) => item._id || index}
          contentContainerStyle={!inverted && styles.notInvertedContentContainerStyle}
          renderItem={({ item }) => this.renderRow(item)}
          ListFooterComponent={inverted ? this.renderLoadEarlier : this.renderFooter}
          ListHeaderComponent={inverted ? this.renderFooter : this.renderLoadEarlier}
          ListScrollComponent={this.renderScrollComponent}
          removeClippedSubviews
          disableVirtualization
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notInvertedContentContainerStyle: {
    justifyContent: 'flex-end'
  }
})

MessageContainer.defaultProps = {
  messages: [],
  user: {},
  renderFooter: null,
  renderMessage: null,
  onLoadEarlier: () => { },
  inverted: true,
  loadEarlier: false,
  listViewProps: {},
  invertibleScrollViewProps: {}
}

MessageContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
  renderFooter: PropTypes.func,
  renderMessage: PropTypes.func,
  renderLoadEarlier: PropTypes.func,
  onLoadEarlier: PropTypes.func,
  listViewProps: PropTypes.object,
  inverted: PropTypes.bool,
  loadEarlier: PropTypes.bool,
  invertibleScrollViewProps: PropTypes.object
}
