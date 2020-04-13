#!/bin/bash

component="import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

import { Metrics, Fonts, Colors, Images } from 'Themes'

import { Header } from 'Components'
import styles from './$1.style'

export default class $1 extends Component {
  render () {
    return (
      <View style={styles.screen}>
        <Header title={''} />
      </View>
    )
  }
}"

style="import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen
})"

index="import React, { Component } from 'react'
import { connect } from 'react-redux'
import $1 from './$1'

class $1Container extends Component {
  render () {
    return (
      <$1 {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)($1Container)
"

echo "Creating screen $1"
mkdir ./App/Screens/$1
printf '%s\n' "$component" >> ./App/Screens/$1/$1.js
printf '%s\n' "$style" >> ./App/Screens/$1/$1.style.js
printf '%s\n' "$index" >> ./App/Screens/$1/index.js
node ./Tools/createIndexExports.js ./App/Screens
