import React from 'react'
import { storiesOf } from '@storybook/react-native'

import SubscriptionModal from './SubscriptionModal'

storiesOf('SubscriptionModal')
  .add('Default', () => (
    <SubscriptionModal />
  ))