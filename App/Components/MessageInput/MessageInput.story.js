import React from 'react'
import { storiesOf } from '@storybook/react-native'

import MessageInput from './MessageInput'

storiesOf('MessageInput')
  .add('Default', () => (
    <MessageInput />
  ))
