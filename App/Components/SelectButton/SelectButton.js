import React, { Component } from 'react'
import { View } from 'react-native'
import { Colors, rem } from 'Themes'
import { GradientButton } from 'Components'
import styles from './SelectButton.style'

const SelectButton = ({ text, field, value, active, onPress, ...etc }) => (
  <View style={styles.button}>
    <GradientButton
      text={text.toUpperCase()}
      borderColor={active ? Colors.purplePink : Colors.pinkishGray}
      textStyle={[styles.buttonText, { color: active ? '#111' : Colors.pinkishGray }]}
      paddingVertical={0.45 * rem}
      value={value}
      field={field}
      onPress={onPress}
      plain
      {...etc} />
  </View>
)

export default SelectButton
