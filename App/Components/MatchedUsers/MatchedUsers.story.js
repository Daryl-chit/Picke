import React from 'react'
import { storiesOf } from '@storybook/react-native'

import MatchedUsers from './MatchedUsers'

storiesOf('MatchedUsers')
  .add('Default', () => (
    <MatchedUsers />
  ))
