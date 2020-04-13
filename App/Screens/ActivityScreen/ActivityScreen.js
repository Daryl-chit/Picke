import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  AsyncStorage
} from 'react-native'
import { Images, calcWidth } from 'Themes'
import { Header, ScalableImage as Image, SubscriptionModal } from 'Components'
import Modal from 'react-native-modal'
import Locales from 'Locales'

import Tabs from './Components/Tabs'
import ActiveUsersTab from './Components/ActiveUsersTab'
import NewUsersTab from './Components/NewUsersTab'
import FilterUsersTab from './Components/FilterUsersTab'
import styles from './ActivityScreen.style'

class ActivityScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tab: 1,
      visible: props.user.is_hidden,
      hideBanner: false
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('HIDE_BANNER', (err, result) => {
      if (result) {
        const value = JSON.parse(result)
        const val = value.hideBanner !== null
        this.setState({ hideBanner: val })
      }
    })
  }

  openModal = () => {
    this.refs.modal.open()
  }

  closeBanner = () => {
    AsyncStorage.setItem('HIDE_BANNER', JSON.stringify({'hideBanner': true}), () => {})
    LayoutAnimation.easeInEaseOut()
    this.setState({ hideBanner: true })
  }

  activate = () => {
    this.setState({ visible: false })
    const { showUser } = this.props
    if (showUser) {
      showUser()
    }
  }

  // Set tab ID
  onToggleTab = tab => { this.setState({ tab }) }

  renderTabContent = () => {
    const { tab } = this.state
    const { users, activeUsersRequest, newUsersRequest, filterUsersRequest, user } = this.props
    const { activeUsers, newUsers, filterUsers } = users
    const ownerID = user.userId
    if (tab === 1) return <ActiveUsersTab request={activeUsersRequest} users={activeUsers} ownerID={ownerID} />
    if (tab === 2) return <NewUsersTab request={newUsersRequest} users={newUsers} ownerID={ownerID} />
    if (tab === 3) return <FilterUsersTab request={filterUsersRequest} users={filterUsers} ownerID={ownerID} />
  }

  renderBanner = () => {
    return (
      <View
        style={styles.bannerLayout}>
        <Image
          source={Images.bannerWith}
          width={calcWidth(1)} />
        <View
          style={styles.bannerButtonLayout}>
          <TouchableOpacity
            onPress={this.openModal}
            style={styles.bannerLeft} />
          <TouchableOpacity
            onPress={this.closeBanner}
            style={styles.bannerRight} />
        </View>
      </View>
    )
  }

  render () {
    const { tab, visible, hideBanner } = this.state
    const { user } = this.props
    const { userInfo } = user
    const { godUser, plusMember } = userInfo
    const isPlus = (godUser || plusMember === '1')

    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Header title={'User\'s Activity'} noBorder />
          <Tabs current={tab} onPress={this.onToggleTab} />
          {this.renderTabContent()}
          {!isPlus && !hideBanner ? this.renderBanner() : null}
        </View>
        <Modal
          useNativeDriver
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          animationInTiming={500}
          animationOutTiming={400}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={400}
          isVisible={visible}>
          <View style={styles.modal}>
            <Text style={styles.modalHeaderText}>
              {Locales.t('accountHiddenTitle').toUpperCase()}
            </Text>
            <Text style={styles.modalText}>
              {Locales.t('accountActivateDescription')}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={this.activate}>
              <Text style={styles.modalButtonText}>
                {Locales.t('activate').toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <SubscriptionModal subscriptionLog={this.props.subscriptionLog} subscriptionRequest={this.props.subscriptionRequest} startIndex={4} ref='modal' />
      </View>
    )
  }
}

export default ActivityScreen
