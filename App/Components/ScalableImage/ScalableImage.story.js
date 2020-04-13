import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ScalableImage from './ScalableImage'

storiesOf('ScalableImage')
  .add('Default', () => (
    <ScalableImage />
  ))
