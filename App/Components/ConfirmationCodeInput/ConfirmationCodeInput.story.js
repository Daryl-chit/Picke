import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ConfirmationCodeInput from './ConfirmationCodeInput'

storiesOf('ConfirmationCodeInput')
  .add('Default', () => (
    <ConfirmationCodeInput />
  ))

