import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ChatEngine from './ChatEngine'

storiesOf('ChatEngine')
  .add('Default', () => (
    <ChatEngine />
  ))
