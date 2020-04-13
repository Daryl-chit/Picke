import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation
} from 'react-native'

import * as Ani from 'react-native-animatable'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'

import { Column as Col, Row } from 'react-native-flexbox-grid'

import { Colors, Fonts } from 'Themes'
import { MaterialSwitch as Switch, Slider } from 'Components'
import { getFeetsDisplay } from 'Tools'

export default class SettingsRow extends Component {
  constructor (props) {
    super(props)
    const { settings, field, multiselect, initialValues, min, max } = props
    this.state = {
      value: initialValues.length > 0 ? true : false,
      values: initialValues.length > 0 ? initialValues : multiselect ? [min, max] : [max]
    }
  }

  componentWillReceiveProps = nextProps => {
    const { values } = this.state
    const { initialValues, min, max, multiselect } = nextProps
    if (values.length > 0 && initialValues.length === 0 && multiselect) this.setState({ values: [min, max] })
    if (values.length === 0 && !multiselect) this.setState({ values: [max] })
  }

  onChange = (value) => {
    const { field, setSettings, multiselect, onSwitchChange, nonUserPlusSwitchChange, isUserPlus } = this.props
    if (isUserPlus) {
      LayoutAnimation.easeInEaseOut()
      this.setState({ value })
      if (onSwitchChange) onSwitchChange(value)
    } else if (nonUserPlusSwitchChange) {
      nonUserPlusSwitchChange()
    } else {
      LayoutAnimation.easeInEaseOut()
      this.setState({ value })
      if (onSwitchChange) onSwitchChange(value)
    }
  }

  onSelect = values => {
    this.setState({ values })
  }

  onFinish = values => {
    const { onValuesChange, field } = this.props
    // console.log('onFinish', field, values)
    if (onValuesChange) onValuesChange(values, field)
  }

  render () {
    const { name, field, units, onValuesChange, ...other } = this.props
    const { value, values } = this.state

    const valuesText = values.length === 1 ? `${values[0]} ${units}` : units === 'feets' ? `${getFeetsDisplay(values[0])} - ${getFeetsDisplay(values[1])} ${units}` : `${values[0]} - ${values[1]} ${units}`

    return (
      <View style={styles.settingsRow}>
        <Row>
          <Col sm={4} style={styles.label}>
            <Text style={[
              styles.settingsRowText,
              value ? { color: Colors.purplePink } : {}
            ]}>{name}</Text>
          </Col>
          <Col sm={5.7} style={styles.valuesWrap}>
            {value ? <Ani.Text
              animation='fadeInRight'
              duration={350}
              delay={57}
              easing='ease-in'
              style={styles.valuesText}>
              {valuesText}
            </Ani.Text> : null}
          </Col>
          <Col sm={2.3}>
            <Switch
              value={value}
              onValueChange={this.onChange} />
          </Col>
        </Row>
        {value
        ? <Ani.View
          animation='zoomIn'
          duration={390}
          delay={100}
          easing='ease-in-out-quart'
          style={styles.sliderContainer}>
          <Slider
            onChange={this.onSelect}
            onValuesChangeFinish={this.onFinish}
            values={values}
            {...other}
          />
        </Ani.View> : null}
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  settingsRow: {
    paddingVertical: '0.25rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  switch: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  valuesWrap: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '3rem',
    height: '3.3rem',
    width: '100%'
  },
  settingsRow: {
    paddingVertical: '0.25rem',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  settingsRowText: {
    fontFamily: Fonts.type.base,
    fontWeight: '500',
    color: '#111',
    fontSize: '1rem'
  },
  valuesText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: '#111',
    fontSize: '0.95rem',
    marginRight: '0.8rem'
  }
})
