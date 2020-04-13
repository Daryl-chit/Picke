import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'
import { Column as Col, Row } from 'react-native-flexbox-grid'

import { LayoutSpring } from 'Animations/LayoutAnimation'
import { calcWidth, calcHeight, calcRem, Images } from 'Themes'
import styles from './UserCardGradient.style'

export default class UserCardGradient extends Component {
  state = {
    width: null,
    height: null,
    keyboard: false
  }
  render () {
    const { id, photo, name, age, messagePlus, milesAway,
      height, education, religion, bodyType, onBottomPress } = this.props
    const { keyboard } = this.state

    return (
      <View
        style={[styles.container]}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout
          this.setState({ width, height })
        }}>
        <View
          style={styles.photoCard}>
          {photo ?
            <Image
              source={{ uri: photo }}
              style={styles.userPhotoImage} />
            : null}
          <Image
          source={Images.fadeGradient}
          style={styles.fadeGradient}
          resizeMode='stretch'/>
          <View
            style={[styles.userInfo, { marginBottom: calcRem(0.1) } ]}>
            <View style={[
              styles.userName, { borderBottomWidth: 1 } ]}>
              <Text style={styles.userNameText}>
                {`${name}, `}
                <Text style={styles.userAgeText}>
                  {age}
                </Text>
              </Text>
              <Text style={styles.userDescText}>{milesAway} miles away</Text>
            </View>
            <View style={styles.userDescContainer}>
              <Row>
                <Col sm={6}>
                  <View style={styles.userDesc}>
                    <Text style={styles.userDescText}>{height}</Text>
                    <Text
                      numberOfLines={1}
                      style={styles.userDescText}>{bodyType}</Text>
                  </View>
                </Col>
                <Col sm={6}>
                  <View style={styles.userDesc}>
                    <Text
                      numberOfLines={1}
                      style={styles.userDescText}>{education}</Text>
                    <Text
                      numberOfLines={1}
                      style={styles.userDescText}>{religion}</Text>
                  </View>
                </Col>
              </Row>
            </View>
          </View>
        </View>
        <View style={[styles.layoutBottom, { minHeight: calcRem(0.5), maxHeight: calcRem(0.5) }]}>
          <Image
          source={Images.cardBottom}
          style={styles.cardBottom}
          resizeMode='stretch'/>
        </View>

      </View>
    )
  }
}
