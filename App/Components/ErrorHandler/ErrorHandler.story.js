import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ErrorHandler from './ErrorHandler'

storiesOf('ErrorHandler')
  .add('Default', () => (
    <ErrorHandler />
  ))
