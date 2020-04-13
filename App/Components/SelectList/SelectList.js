import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import { GradientButton } from 'Components'

import { rem, Colors } from 'Themes'

import styles from './SelectList.style'

export default class SelectList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      values: props.selected || []
    }
  }

  onSelect (item, index) {
    const { onSelect, field, multiselect } = this.props
    if (multiselect) {
      this.onMultiSelect(item, index)
    } else if (onSelect) onSelect({ index, field, item })
  }

  onMultiSelect (item, index) {
    let next = this.state.values
    if (next.includes(item)) {
      next = next.filter(f => f !== item)
    } else {
      next.push(item)
    }
    this.setState({ values: next })
  }

  renderItem = (item, index) => {
    const { selected, multiselect } = this.props
    const { values } = this.state

    const isSelected = multiselect ? values.includes(item) : (selected === index)
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => this.onSelect(item, index)}
        key={index}>
        <Text style={styles.itemText}>{item}</Text>
        {isSelected
        ? <View style={styles.check}>
          <Icon
            name='ios-checkmark'
            size={2.5 * rem}
            color={Colors.purplePink} />
        </View> : null}
      </TouchableOpacity>
    )
  }

  onDone = () => {
    const { values } = this.state
    const { onDone } = this.props
    if (onDone) onDone(values)
  }
  render () {
    const { data, containerStyle, title, multiselect } = this.props
    const { values } = this.state
    return (
      <View style={[
        styles.selectList,
        containerStyle ? containerStyle : {}
      ]}>
        {title ? <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>{title}</Text>
        </View> : null}
        <ScrollView>
          {data ? data.map(this.renderItem) : null}
        </ScrollView>
        {multiselect
        ? values.length > 0 ? <GradientButton
          style={{ marginTop: 10, marginHorizontal: 10 }}
          text='Select'
          color='purple'
          onPress={this.onDone} /> : <GradientButton
            style={{ marginTop: 10, marginHorizontal: 10 }}
            text='Select'
            color='grey'
            nonClickable />
        : null}
      </View>
    )
  }
}
