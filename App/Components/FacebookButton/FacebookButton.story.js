import React from 'react'
import { storiesOf } from '@storybook/react-native'

import FacebookButton from './FacebookButton'

storiesOf('FacebookButton')
  .add('Default', () => (
    <FacebookButton
      text='A simple rounded button'
    />
  ))
