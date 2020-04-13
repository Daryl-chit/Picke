import React from 'react'
import { storiesOf } from '@storybook/react-native'

import LoaderOverlay from './LoaderOverlay'

storiesOf('LoaderOverlay')
  .add('Default', () => (
    <LoaderOverlay />
  ))
