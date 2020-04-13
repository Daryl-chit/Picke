import React, { Component } from 'react'
import { View, LayoutAnimation } from 'react-native'

import styles from './ProgressLine.style'

const Dot = ({ active, onLayout }) => (
  <View style={styles.circle} onLayout={onLayout}>
    {active ? <View style={styles.dot} /> : null}
  </View>
)

export default class ProgressLine extends Component {
  state = {
    width: null,
    layouts: []
  }
  onLayout (e, i) {
    let layouts = this.state.layouts
    layouts[i] = e.nativeEvent.layout.x
    this.setState({ layouts })
  }
  componentWillReceiveProps (next, prev) {
    if (next.current !== prev.current) LayoutAnimation.easeInEaseOut()
  }
  setWidth = (e) => this.setState({ width: e.nativeEvent.layout.width })
  render () {
    const { steps, style, current } = this.props
    const { x, width, layouts } = this.state
    return (
      <View
        style={[
          styles.wrap,
          style || {}
        ]}
        onLayout={this.setWidth}>
        <View style={[styles.dots]}>
          {steps.map((is, i) =>
            <Dot
              active={is}
              key={i}
              onLayout={(e) => this.onLayout(e, i)} />)}
        </View>
        <View style={[styles.line, { width: layouts[current] }]} />
        <View style={[styles.line, styles.grayLine]} />
      </View>
    )
  }
}
