import React, { Component } from 'react'
import {
  View,
  FlatList
} from 'react-native'
import { Actions } from 'react-native-router-flux'

import { AnimatedLoader, Empty } from 'Components'
import { rem } from 'Themes'

import UserItem from './UserItem'
import styles from '../ActivityScreen.style'

class UsersTab extends Component {
  constructor (props) {
    super(props)
    this.state = {
      maxItems: 20
    }
  }
  componentWillMount () { this.props.request() }
  componentDidMount () {}

  onEndReached = () => {
    const { users } = this.props
    const { list } = users
    const { maxItems } = this.state
    const itemsLength = list.length
    let count = maxItems + 9
    if (count > itemsLength) count = itemsLength
    if (count < itemsLength) this.setState({ maxItems: count })
  }

  renderUsersItem = (user, index) => {
    return (
      <View key={index} style={styles.usersItem}>
        <UserItem
          noActivity={!!user.sign_up_date}
          user={user.item}
          newUser
          onPress={(userID) => {
            Actions.userCardScreen({ userId: userID, userName: user.item.name, blockedUser: user.item.blocked })
          }}
        />
      </View>
    )
  }

  renderUsers = () => {
    const { users } = this.props
    return (
      <FlatList
        data={users.list.filter((f, i) => i <= this.state.maxItems)}
        renderItem={this.renderUsersItem}
        numColumns={3}
        style={{width: '100%'}}
        contentContainerStyle={{paddingTop: rem * 1.5, paddingBottom: rem * 2}}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.95}
      />
    )
  }

  render () {
    const { users } = this.props
    if (users.list.length > 0 && !users.fetching) {
      return (
        <View style={styles.content}>
          { this.renderUsers() }
        </View>
      )
    } else if (users.fetching) {
      return <AnimatedLoader heightRatio={0.8} />
    } else {
      return <Empty text={'Can\'t load new users. Try again in a moment.'} />
    }
  }
}

export default UsersTab
