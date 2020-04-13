#!/bin/bash

component="import React, { Component } from 'react'
import {
  View
} from 'react-native'

import styles from './$1.style'

export default class $1 extends Component {
  render () {
    return (
      <View style={styles.component}>
      </View>
    )
  }
}"

story="import React from 'react'
import { storiesOf } from '@storybook/react-native'

import $1 from './$1'

storiesOf('$1')
  .add('Default', () => (
    <$1 />
  ))"

style="import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  component: {
    flex: 1
  }
})"

index="import $1 from './$1'

export default $1"

echo "Creating component $1"
mkdir ./App/Components/$1
printf '%s\n' "$component" >> ./App/Components/$1/$1.js
printf '%s\n' "$style" >> ./App/Components/$1/$1.style.js
printf '%s\n' "$story" >> ./App/Components/$1/$1.story.js
printf '%s\n' "$index" >> ./App/Components/$1/index.js
echo -e "import './$1/$1.story'" >> ./App/Components/Stories.js
node ./Tools/createIndexExports.js ./App/Components
