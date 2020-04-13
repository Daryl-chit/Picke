import React from 'react'
import { storiesOf } from '@storybook/react-native'

import MessageBar from './MessageBar'

storiesOf('MessageBar')
  .add('Default', () => (
    <MessageBar />
  ))
