import React from 'react'
import { storiesOf } from '@storybook/react-native'

import UserCard from './UserCard'

storiesOf('UserCard')
  .add('Default', () => (
    <UserCard />
  ))
