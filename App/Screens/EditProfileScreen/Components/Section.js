
import React from 'react'
import {
  View,
  Text
} from 'react-native'

import styles from '../EditProfileScreen.style'

const Section = ({ label, title, children, onPress }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  )
}

export default Section
