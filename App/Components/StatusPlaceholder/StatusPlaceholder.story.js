import React from 'react'
import { storiesOf } from '@storybook/react-native'

import StatusPlaceholder from './StatusPlaceholder'

storiesOf('StatusPlaceholder')
  .add('Default', () => (
    <StatusPlaceholder />
  ))
