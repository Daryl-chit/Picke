import 'Config'
import DebugConfig from 'Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'

import RootContainer from './RootContainer'
import createStore from 'Redux'

import { rem } from 'Themes'

const store = createStore()

EStyleSheet.build({
  $rem: rem
})

console.disableYellowBox = true

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer navigation={this.props.navigation} />
      </Provider>
    )
  }
}

export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
