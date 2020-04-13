import React from 'react'
import {
  View,
  Text
} from 'react-native'

import styles from '../Settings.style'

const SettingsSection = ({ title, children }) => {
  return (
    <View style={styles.controlGroup}>
      <Text style={styles.sectionTitleText}>{title.toUpperCase()}</Text>
      {children}
    </View>
  )
}

const ControlGroup = ({ title, children }) => {
  return (
    <View style={styles.controlGroupContainer}>
      {children}
    </View>
  )
}

export {
  SettingsSection,
  ControlGroup
}
