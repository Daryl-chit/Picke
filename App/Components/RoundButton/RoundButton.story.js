import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Button from './RoundButton'

storiesOf('RoundButton')
  .add('Default', () => (
    <Button
      text='A simple rounded button'
    />
  ))
