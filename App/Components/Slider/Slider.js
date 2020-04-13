import React, { Component } from 'react'
import {
  View
} from 'react-native'

import { MultiSlider } from 'Components'

import { Colors, calcRem, calcWidth } from 'Themes'
import styles from './Slider.style'

export default class Slider extends Component {
  multiSliderValuesChange = (values) => {
    const { onChange } = this.props
    if (onChange) onChange(values)
  }

  render () {
    const { min, max, values, step, style, ...other } = this.props

    return (
      <View style={[styles.component, style || {}]}>
        <MultiSlider
          values={values}
          selectedStyle={{
            backgroundColor: Colors.purplePink
          }}
          unselectedStyle={{
            backgroundColor: 'silver'
          }}
          trackStyle={{
            height: 3
          }}
          sliderLength={calcWidth(0.7)}
          onValuesChange={this.multiSliderValuesChange}
          min={min || 0}
          max={max || 10}
          step={step | 1}
          {...other}
        />
      </View>
    )
  }
}
