import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'

import Router from 'Router'
import { connect } from 'react-redux'
import StartupActions from 'Redux/StartupRedux'
import ReduxPersist from 'Config/ReduxPersist'

import { Pusher, Location, DeepLinking, MessageBar } from 'Components'
import { Alert } from 'Components/Alert'
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    if (!ReduxPersist.active) this.props.startup()
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='dark-content' backgroundColor='#fff' />
        <Router />
        <Pusher />
        <Location />
        {/* <ReduxNavigation /> */}
        <MessageBar />
        <Alert />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
