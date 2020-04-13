import React from 'react'
import { storiesOf } from '@storybook/react-native'

import MaskedInput from './MaskedInput'

storiesOf('MaskedInput')
  .add('Default', () => (
    <MaskedInput />
  ))
